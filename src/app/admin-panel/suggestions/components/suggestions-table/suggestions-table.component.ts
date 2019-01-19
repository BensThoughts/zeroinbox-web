import { Component, OnInit, ViewChild, Input, ChangeDetectionStrategy } from '@angular/core';
import { PageEvent, MatTableDataSource, MatPaginator, MatTable } from '@angular/material';
import { Store, select } from '@ngrx/store';
import {
  AppState,
} from '@app/core';

import {
  selectPageOfSuggestions_CountMoreThan,
  selectLengthOfSuggestions_CountMoreThan,
} from '../../state/suggestions.selectors';

import {
  SuggestionsToggleUpdateManyAction,
  SuggestionsToggleUpdateAction,
  SetCutoffAction,
} from '../../state/suggestions.actions';


import { Update } from '@ngrx/entity';
import { Observable, from, of, BehaviorSubject } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { tap, map, take } from 'rxjs/operators';
import { CollectionViewer, SelectionModel } from '@angular/cdk/collections';
import { SettingsChangeCountCutoffAction } from '@app/admin-panel/settings/state/settings.actions';
import { ISuggestion } from '../../state/suggestions.model';

export interface PageQuery {
  pageIndex: number;
  pageSize:number;
}


@Component({
  selector: 'go-suggestions-table',
  templateUrl: './suggestions-table.component.html',
  styleUrls: ['./suggestions-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuggestionsTableComponent implements OnInit {


  // @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['label', 'delete', 'address', 'count'];

  dataSource: SuggestionsDataSource;

  length;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  selectionDelete = new SelectionModel<string>(true, []);
  selectionLabel = new SelectionModel<string>(true, []);

  collectionViewer: CollectionViewer;
  mySub: Observable<ISuggestion[]>;

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

    this.dataSource = new SuggestionsDataSource(this.store);

    const initialPage: PageQuery = {
      pageIndex: 0,
      pageSize: this.pageSize
    };

    this.dataSource.loadSuggestions(initialPage);
    this.store.pipe(
      select(selectLengthOfSuggestions_CountMoreThan),
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


  onCountCutoffSelect({ value: cutoff }) {
    this.store.dispatch(new SetCutoffAction({ cutoff: cutoff }));
    this.store.pipe(
      select(selectLengthOfSuggestions_CountMoreThan),
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


  suggestionToggle(action: string, iSuggestions: ISuggestion) {

    let selectionModel = this.selectSelectionModel(action);

    let diff = !this.selectActionValue(action, iSuggestions);
    let changes = this.selectChanges(action, diff);

    if (diff) {
      selectionModel.select(iSuggestions.id);
    } else {
      selectionModel.deselect(iSuggestions.id);
    }

    const newUpdate: Update<ISuggestion> = {
      id: iSuggestions.id,
      changes
    };

    this.store.dispatch(new SuggestionsToggleUpdateAction({ suggestion: newUpdate }));
  }


  masterToggle(action: string) {
    let changes = {};
    let changeArray: Update<ISuggestion>[] = [];

    let oppositeSelectionModel: SelectionModel<string>;
    const selectionModel = this.selectSelectionModel(action);

    if (this.isAllSelected(action)) {
      selectionModel.clear();
      changes = this.selectChanges(action, false);
      this.mySub.pipe(take(1)).subscribe((iSuggestions: ISuggestion[]) => {

        changeArray = iSuggestions.map((iSuggestion) => {
          return {
            id: iSuggestion.id,
            changes
          };
        });

      });
    } else {
      if (action === 'delete') {
        oppositeSelectionModel = this.selectSelectionModel('label');
        changes = {
          delete: true,
          label: false
        }
      } else {
        oppositeSelectionModel = this.selectSelectionModel('delete');
        changes = {
          delete: false,
          label: true
        }
      }
      oppositeSelectionModel.clear();
      this.mySub.pipe(take(1)).subscribe((iSuggestions: ISuggestion[]) => {
        changeArray = iSuggestions.map((iSuggestion) => {
          selectionModel.select(iSuggestion.id);
          return {
            id: iSuggestion.id,
            changes
          };
        })
      });
    }

  this.store.dispatch(new SuggestionsToggleUpdateManyAction({ suggestions: changeArray }));
  }


  isAllSelected(action: string) {

    let selectionModel = this.selectSelectionModel(action);
    const numSelected = selectionModel.selected.length;
    let numRows;
    this.mySub.pipe(take(1)).subscribe((iSuggestionss: ISuggestion[]) => {
      numRows = iSuggestionss.length
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

  selectActionValue(action: string, iSuggestion: ISuggestion) {
    try {
      switch (action) {
        case 'label':
          return iSuggestion.label;
        case 'delete':
          return iSuggestion.delete;

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
            label: diff
          };
        case 'delete':
          return {
            delete: diff
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

export class SuggestionsDataSource extends DataSource<any> {
  private suggestionsSubject = new BehaviorSubject<ISuggestion[]>([]);
  constructor(private store: Store<AppState>) {
    super();

  }

  loadSuggestions(page: PageQuery) {
    console.log(page);
    this.store.pipe(
      select(selectPageOfSuggestions_CountMoreThan(page)),
      tap((suggestions) => {
        // console.log(suggestions);
        this.suggestionsSubject.next(suggestions)
      })
    ).subscribe();
  }

  connect(collectionViewer: CollectionViewer): Observable<ISuggestion[]> {
    // return of(this.sendersSource);
    return this.suggestionsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.suggestionsSubject.complete();
  }

}
