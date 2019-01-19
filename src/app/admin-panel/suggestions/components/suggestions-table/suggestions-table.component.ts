import { Component, OnInit, ViewChild, Input, ChangeDetectionStrategy } from '@angular/core';
import { PageEvent, MatTableDataSource, MatPaginator, MatTable } from '@angular/material';
import { ISenders } from '@app/core/state/gmail-api/models/senders.model';
import { Store, select } from '@ngrx/store';
import {
  AppState,
  PageQuery,
  selectPageOfSenders_CountMoreThan,
  selectLengthOfSenders_CountMoreThan,
  SendersToggleUpdateManyAction,
  SendersToggleUpdateAction,
} from '@app/core';
import { Update } from '@ngrx/entity';
import { Observable, from, of, BehaviorSubject } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { tap, map, take } from 'rxjs/operators';
import { CollectionViewer, SelectionModel } from '@angular/cdk/collections';
import { SettingsChangeCountCutoffAction } from '@app/admin-panel/settings/state/settings.actions';

@Component({
  selector: 'go-suggestions-table',
  templateUrl: './suggestions-table.component.html',
  styleUrls: ['./suggestions-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuggestionsTableComponent implements OnInit {


  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['label', 'delete', 'address', 'count'];

  dataSource: UserDataSource;

  length;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  selectionDelete = new SelectionModel<string>(true, []);
  selectionLabel = new SelectionModel<string>(true, []);

  collectionViewer: CollectionViewer;
  mySub: Observable<ISenders[]>;

  countCutoff: number;
  countCutoffs = [
    { value: 1, label: '1 thread' },
    { value: 5, label: '5 threads' },
    { value: 10, label: '10 threads' },
    { value: 20, label: '20 threads' },
    { value: 50, label: '50 threads' }
  ];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {

    this.dataSource = new UserDataSource(this.store);

    const initialPage: PageQuery = {
      pageIndex: 0,
      pageSize: this.pageSize
    };

    this.dataSource.loadSuggestions(initialPage);
    this.store.pipe(
      select(selectLengthOfSenders_CountMoreThan),
      take(1),
      map((unique_senders_length) => {
        this.length = unique_senders_length
      })
    ).subscribe()

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


  onCountCutoffSelect({ value: countCutoff }) {
    this.store.dispatch(new SettingsChangeCountCutoffAction({ countCutoff }));
    this.store.pipe(
      select(selectLengthOfSenders_CountMoreThan),
      take(1),
      map((unique_senders_length) => {
        this.length = unique_senders_length
      })
    ).subscribe()

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


  suggestionToggle(action: string, iSenders: ISenders) {

    let selectionModel = this.selectSelectionModel(action);

    let diff = !this.selectActionValue(action, iSenders);
    let changes = this.selectChanges(action, diff);

    if (diff) {
      selectionModel.select(iSenders.id);
    } else {
      selectionModel.deselect(iSenders.id);
    }

    const newUpdate: Update<ISenders> = {
      id: iSenders.id,
      changes
    };

    this.store.dispatch(new SendersToggleUpdateAction({ iSenders: newUpdate }));
  }


  masterToggle(action: string) {
    let changes = {};
    let changeArray: Update<ISenders>[] = [];

    let oppositeSelectionModel: SelectionModel<string>;
    const selectionModel = this.selectSelectionModel(action);

    if (this.isAllSelected(action)) {
      selectionModel.clear();
      changes = this.selectChanges(action, false);
      this.mySub.pipe(take(1)).subscribe((iSenderss: ISenders[]) => {
        iSenderss.forEach((iSenders) => {
          let newUpdate: Update<ISenders> = {
            id: iSenders.id,
            changes
          }
          changeArray = changeArray.concat(newUpdate);
        });
      });
    } else {
      if (action === 'delete') {
        oppositeSelectionModel = this.selectSelectionModel('label');
        changes = {
          actionDelete: true,
          actionLabel: false
        }
      } else {
        oppositeSelectionModel = this.selectSelectionModel('delete');
        changes = {
          actionDelete: false,
          actionLabel: true
        }
      }
      oppositeSelectionModel.clear();
      this.mySub.pipe(take(1)).subscribe((iSenderss: ISenders[]) => {
        iSenderss.forEach((isenders) => {
          selectionModel.select(isenders.id);
          let newUpdate: Update<ISenders> = {
            id: isenders.id,
            changes
          }
          changeArray = changeArray.concat(newUpdate);
        });
      });
    }

  this.store.dispatch(new SendersToggleUpdateManyAction({ iSenderss: changeArray }));
  }


  isAllSelected(action: string) {

    let selectionModel = this.selectSelectionModel(action);
    const numSelected = selectionModel.selected.length;
    let numRows;
    this.mySub.pipe(take(1)).subscribe((iSenderss: ISenders[]) => {
      numRows = iSenderss.length
    });

    return numSelected == numRows;

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

  selectActionValue(action: string, iSenders: ISenders) {
    try {
      switch (action) {
        case 'label':
          return iSenders.actionLabel;
        case 'delete':
          return iSenders.actionDelete;

        default:
          throw new Error('Error: ' + action + ' is not one of "label" or "delete"');
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
          throw new Error('Error: ' + action + ' is not one of "label" or "delete"');
      }
    }
    catch(e) {
      console.error(e);
    }
  }

}

export class UserDataSource extends DataSource<any> {
  private suggestionsSubject = new BehaviorSubject<ISenders[]>([]);
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

  connect(collectionViewer: CollectionViewer): Observable<ISenders[]> {
    // return of(this.sendersSource);
    return this.suggestionsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.suggestionsSubject.complete();
  }

}
