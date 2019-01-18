import { Component, OnInit, ViewChild, Input, ChangeDetectionStrategy } from '@angular/core';
import { PageEvent, MatTableDataSource, MatPaginator, MatTable } from '@angular/material';
import { ISuggested } from '@app/core/state/gmail-api/models/suggested.model';
import { Store, select } from '@ngrx/store';
import {
  AppState,
  SuggestedToggleDeleteAction,
  SuggestedToggleLabelAction,
  SuggestedToggleDeleteManyAction,
  SuggestedToggleLabelManyAction,
  PageQuery,
  selectPageOfSenders_CountMoreThan,
  selectLengthOfSenders_CountMoreThan,
  SuggestedToggleAction,
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


  onSuggestionToggle(iSuggested: ISuggested, actionDelete: boolean) {
    let changes = {}
    if (actionDelete) {
      let diff = !iSuggested.actionDelete;
      changes = {
        actionDelete: diff
      }
      if (diff) {
        this.selectionDelete.select(iSuggested.id);
      } else {
        this.selectionDelete.deselect(iSuggested.id);
      }
    } else {
      let diff = !iSuggested.actionLabel;
      changes = {
        actionLabel: diff
      }
      if (diff) {
        this.selectionLabel.select(iSuggested.id);
      } else {
        this.selectionLabel.deselect(iSuggested.id);
      }
    }
    const newUpdate: Update<ISuggested> = {
      id: iSuggested.id,
      changes
    };
    this.store.dispatch(new SuggestedToggleAction({iSuggested: newUpdate}));
    // this.dataSource = new MatTableDataSource(this.suggestedData);
    // this.dataSource.paginator = this.paginator;
  }


  isAllDeleteSelected() {
    const numSelected = this.selectionDelete.selected.length;
    let numRows;
    let handler = this.mySub.subscribe((iSuggesteds: ISuggested[]) => {
      numRows = iSuggesteds.length
    });
    // console.log('numRows Delete: ' + numRows);
    // console.log('numSelected Delete: ' + numSelected);
    return numSelected == numRows;
  }

  masterToggleDelete() {
    // console.log(this.isAllDeleteSelected());
    let changeArray = [];
    if (this.isAllDeleteSelected()) {
      this.selectionDelete.clear()
      const changes = {
        actionDelete: false
      };
      let handler = this.mySub.subscribe((iSuggesteds: ISuggested[]) => {
        iSuggesteds.forEach((iSuggested) => {
          let newUpdate: Update<ISuggested> = {
            id: iSuggested.id,
            changes
          }
          changeArray = changeArray.concat(newUpdate);
        });
      });
      handler.unsubscribe();
    } else {
      this.selectionLabel.clear();
      const changes = {
        actionDelete: true,
        actionLabel: false
      };

      let handler = this.mySub.subscribe((isuggested) => {
        isuggested.forEach((isuggested) => {
          this.selectionDelete.select(isuggested.id);
        });
      });
      this.selectionDelete.selected.forEach((iSuggestedId) => {
        let newUpdate: Update<ISuggested> = {
          id: iSuggestedId,
          changes
        };
        changeArray = changeArray.concat(newUpdate);
      });
      handler.unsubscribe();

    }
    this.store.dispatch(new SuggestedToggleDeleteManyAction({ iSuggesteds: changeArray }));

  }


  isAllLabelSelected() {
    const numSelected = this.selectionLabel.selected.length;
    let numRows;
    let handler = this.mySub.subscribe((iSuggested) => {
      numRows = iSuggested.length
    });
    // console.log('numRows Label: ' + numRows);
    // console.log('numSelected Label: ' + numSelected);
    return numSelected == numRows;
  }

  masterToggleLabel() {
    let changeArray = [];
    if (this.isAllLabelSelected()) {
      this.selectionLabel.clear()
      const changes = {
        actionLabel: false
      };
      let handler = this.mySub.subscribe((iSuggesteds: ISuggested[]) => {
        iSuggesteds.forEach((iSuggested) => {
          let newUpdate: Update<ISuggested> = {
            id: iSuggested.id,
            changes
          }
          changeArray = changeArray.concat(newUpdate);
        });
      });
      handler.unsubscribe();
    } else {
      this.selectionDelete.clear();
      const changes = {
        actionLabel: true,
        actionDelete: false
      };

      // let handler =
      this.mySub.pipe(take(1)).subscribe((iSuggesteds: ISuggested[]) => {
        iSuggesteds.forEach((iSuggested: ISuggested) => {
          this.selectionLabel.select(iSuggested.id);
        });
      });
      this.selectionLabel.selected.forEach((iSuggestedId: string) => {
        let newUpdate: Update<ISuggested> = {
          id: iSuggestedId,
          changes
        };
        changeArray = changeArray.concat(newUpdate);
      });
      // handler.unsubscribe();

    }
    this.store.dispatch(new SuggestedToggleLabelManyAction({ iSuggesteds: changeArray }));

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
