import { Component, OnInit, ViewChild, Input, ChangeDetectionStrategy } from '@angular/core';
import { PageEvent, MatTableDataSource, MatPaginator, MatTable } from '@angular/material';
import { ISuggested } from '@app/core/state/gmail-api/models/suggested.model';
import { Store, select } from '@ngrx/store';
import {
  AppState,
  PageQuery,
  selectPageOfSenders_CountMoreThan,
  selectLengthOfSenders_CountMoreThan,
  SuggestedToggleUpdateManyAction,
  SuggestedToggleUpdateAction,
} from '@app/core';
import { Update } from '@ngrx/entity';
import { Observable, from, of, BehaviorSubject } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { tap, map, take } from 'rxjs/operators';
import { CollectionViewer, SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'go-suggestions-table',
  templateUrl: './suggestions-table.component.html',
  styleUrls: ['./suggestions-table.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuggestionsTableComponent implements OnInit {


  // @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['label', 'delete', 'address', 'count'];

  dataSource: UserDataSource;

  length;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  selectionDelete = new SelectionModel<string>(true, []);
  selectionLabel = new SelectionModel<string>(true, []);

  collectionViewer: CollectionViewer;
  mySub: Observable<ISuggested[]>;

  countCutoff: number;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    // this.dataSource = new MatTableDataSource(this.suggestedData);
    this.dataSource = new UserDataSource(this.store);
    // this.dataSource.paginator = this.paginator;
    // this.length = this.suggestedData.length;
    const initialPage: PageQuery = {
      pageIndex: 0,
      pageSize: 10
    };
    this.dataSource.loadSuggestions(initialPage);
    let storeHandler = this.store.pipe(
      select(selectLengthOfSenders_CountMoreThan),
      take(1),
      map((unique_senders_length) => {
        this.length = unique_senders_length
      })
    ).subscribe() //(unique_senders) => {
      // this.length = unique_senders
    // });
    // storeHandler.unsubscribe;

    this.mySub = this.dataSource.connect(this.collectionViewer);
  }

  ngAfterViewInit() {
    this.paginator.page.pipe(
      tap(() => this.loadSuggestionsPage())
    ).subscribe();
  }

  ngOnDestory() {
    this.dataSource.disconnect(this.collectionViewer);
  }


  loadSuggestionsPage() {
    this.selectionDelete.clear();
    this.selectionLabel.clear();

    const newPage: PageQuery = {
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize
      };

      this.dataSource.loadSuggestions(newPage);
  }


  selectSelectionModel(action: string) {
    try {
      switch (action) {
        case 'label':
          return this.selectionLabel;
        case 'delete':
          return this.selectionDelete;

        default:
          throw new Error('Error: ' + action + ' is not one of "label" or "delete"');
      }
    }
    catch(e) {
      console.error(e);
    }
  }

  selectActionValue(action: string, iSuggested: ISuggested) {
    try {
      switch (action) {
        case 'label':
          return iSuggested.actionLabel;
        case 'delete':
          return iSuggested.actionDelete;

        default:
          throw new Error('Error: ' + select + ' is not one of "label" or "delete"');
        }
    }
    catch(e) {
      console.error(e);
    }
  }

  selectChanges(action: string, diff: boolean) {
    try {
      switch (action) {
        case 'label':
          return {
            actionLabel: diff
          };
        case 'delete':
          return {
            actionDelete: diff
          };

        default:
          throw new Error('Error: ' + select + ' is not one of "label" or "delete"');
      }
    }
    catch(e) {
      console.error(e);
    }
  }

  onSuggestionToggle(action: string, iSuggested: ISuggested) {

    let selectionModel = this.selectSelectionModel(action);


    let diff = !this.selectActionValue(action, iSuggested);
    let changes = this.selectChanges(action, diff);

    if (diff) {
      selectionModel.select(iSuggested.id);
    } else {
      selectionModel.deselect(iSuggested.id);
    }

    const newUpdate: Update<ISuggested> = {
      id: iSuggested.id,
      changes
    };

    this.store.dispatch(new SuggestedToggleUpdateAction({ iSuggested: newUpdate }));
  }


  isAllSelected(action: string) {

    let selectionModel = this.selectSelectionModel(action);
    const numSelected = selectionModel.selected.length;
    let numRows;
    this.mySub.pipe(take(1)).subscribe((iSuggesteds: ISuggested[]) => {
      numRows = iSuggesteds.length
    });

    return numSelected == numRows;

  }

  masterToggle(action: string) {
    let changes = {};
    let changeArray: Update<ISuggested>[] = [];

    let oppositeSelectionModel: SelectionModel<string>;
    const selectionModel = this.selectSelectionModel(action);

    if (this.isAllSelected(action)) {
      changes = this.selectChanges(action, true);
      selectionModel.clear();
      changes = this.selectChanges(action, false);
      this.mySub.pipe(take(1)).subscribe((iSuggesteds: ISuggested[]) => {
        iSuggesteds.forEach((iSuggested) => {
          let newUpdate: Update<ISuggested> = {
            id: iSuggested.id,
            changes
          }
          changeArray = changeArray.concat(newUpdate);
        });
      });
    } else {
      if (action === 'delete') {
        // selectionModel = this.selectSelectionModel('delete');
        oppositeSelectionModel = this.selectSelectionModel('label');
        changes = {
          actionDelete: true,
          actionLabel: false
        }
      } else {
        // selectionModel = this.selectSelectionModel('label');
        oppositeSelectionModel = this.selectSelectionModel('delete');
        changes = {
          actionDelete: false,
          actionLabel: true
        }
      }
      oppositeSelectionModel.clear();
      this.mySub.pipe(take(1)).subscribe((iSuggesteds: ISuggested[]) => {
        iSuggesteds.forEach((isuggested) => {
          selectionModel.select(isuggested.id);
          let newUpdate: Update<ISuggested> = {
            id: isuggested.id,
            changes
          }
          changeArray = changeArray.concat(newUpdate);
        });
      });
    }

  this.store.dispatch(new SuggestedToggleUpdateManyAction({ iSuggesteds: changeArray }));
  }


}

export class UserDataSource extends DataSource<any> {
  private suggestionsSubject = new BehaviorSubject<ISuggested[]>([]);
  constructor(private store: Store<AppState>) {
    super();

  }

  loadSuggestions(page: PageQuery) {
    console.log(page);
    this.store.pipe(
      select(selectPageOfSenders_CountMoreThan(page)),
      tap((suggestions) => {
        // console.log(suggestions);
        this.suggestionsSubject.next(suggestions)
      })
    ).subscribe();
  }
  connect(collectionViewer: CollectionViewer): Observable<ISuggested[]> {
    // return of(this.suggestedSource);
    return this.suggestionsSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.suggestionsSubject.complete();
  }
}
