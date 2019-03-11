import { Component, OnInit, ViewChild, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator, MatTable } from '@angular/material';
import { Store, select } from '@ngrx/store';
import {
  AppState,
} from '@app/core';

import {
  selectByCountLength,
  selectCountCutoff,
  selectByCountPage,
} from '../../state/suggestions.selectors';

import {
  SetCountCutoffAction,
  LabelByNameSuggestionsAction,
  DeleteSuggestionsMetaAction,
} from '../../state/suggestions.actions';


import { Observable, of, BehaviorSubject, Subscription } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { tap, map, take, delay } from 'rxjs/operators';
import { CollectionViewer, SelectionModel } from '@angular/cdk/collections';
import { ISuggestion } from '../../model/suggestions.model';
import { rowAnimations } from './rowAnimations';
import { selectSuggestionIds } from '../../state/suggestions.selectors';
import { selectSendersById } from '../../../../core/state/senders/senders.selectors';
import { ISender } from '../../../../core/state/senders/model/senders.model';
import { UpsertTasksAction, AddTasksAction } from '../../../../core/state/tasks/tasks.actions';

export interface PageQuery {
  pageIndex: number;
  pageSize:number;
}

@Component({
  selector: 'app-count-suggestions-table',
  templateUrl: './suggestions-count-table.component.html',
  styleUrls: ['./suggestions-count-table.component.scss'],
  animations: [rowAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SuggestionsCountTableComponent implements OnInit {


  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['address'];

  dataSource: SuggestionsByCountDataSource;

  length;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  selectionDelete = new SelectionModel<string>(true, []);
  selectionLabel = new SelectionModel<string>(true, []);

  collectionViewer: CollectionViewer;
  mySub: Observable<ISender[]>;

  cutoff$: Observable<number>;
  countCutoffs = [
    { value: 1, label: '1 thread' },
    { value: 15, label: '15 threads' },
    { value: 50, label: '50 threads' },
    { value: 100, label: '100 threads' },
    { value: 500, label: '500 threads' }
  ];

  handler: Subscription;

  myRemoved = true;

  lengthOfSuggestions_CountMoreThan$;


   toggle() {
     this.myRemoved = !this.myRemoved;
   }

  constructor(private store: Store<AppState>) { }

  ngOnInit() {

    this.cutoff$ = this.store.pipe(select(selectCountCutoff));
    this.lengthOfSuggestions_CountMoreThan$ = this.store.pipe(select(selectByCountLength));

    this.dataSource = new SuggestionsByCountDataSource(this.store);


    const initialPage: PageQuery = {
      pageIndex: 0,
      pageSize: this.pageSize
    };

    this.dataSource.loadSuggestions(initialPage);

    this.updatePaginatorLength();



  }

  ngAfterViewInit() {
  this.paginator.page.pipe(
    tap(() => this.loadSuggestionsPage())
  ).subscribe();

  }


  onCutoffSelect({ value: cutoff }) {
    this.store.dispatch(new SetCountCutoffAction({ countCutoff: cutoff }));

    this.updatePaginatorLength();
    this.clearSelections();
    this.paginator.firstPage();
  }


  loadSuggestionsPage() {
    this.clearSelections();

    const newPage: PageQuery = {
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize
      };

      this.dataSource.loadSuggestions(newPage);
  }

  updatePaginatorLength() {
    this.store.pipe(
      select(selectByCountLength),
      take(1),
      map((length) => {
        this.paginator.length = length;
      })
    ).subscribe();
  }


  clearSelections() {
    this.selectionDelete.clear();
    this.selectionLabel.clear();
  }


  createActions() {

    this.toggle();
    let deleteTasks = this.selectionDelete.selected;
    let labelTasks = this.selectionLabel.selected;
    let tasks = {
      deleteTasks: deleteTasks,
      labelByNameTasks: labelTasks
    };

    this.store.dispatch(new AddTasksAction({ tasks: tasks }))

    // if (this.selectionDelete.hasValue()) {
      // this.store.dispatch(new DeleteSuggestionsMetaAction({ ids: this.selectionDelete.selected }));
    // }

    // if (this.selectionLabel.hasValue()) {
      // this.store.dispatch(new LabelByNameSuggestionsAction({ ids: this.selectionLabel.selected }));
    // }

    of(true).pipe(
      take(1),
      delay(200),
      map(() => {
        if (!this.paginator.hasNextPage() && this.paginator.hasPreviousPage()) {
          if (this.dataSource.getLength() === 0) {
            this.paginator.previousPage();
          }
        }
        this.clearSelections();
        this.updatePaginatorLength();
        this.toggle();
      })
    ).subscribe();

  }


  toggleFromRow(id: string) {
    if (!this.isSelected('label', id) && !this.isSelected('delete', id)) {
        this.selectionLabel.select(id);
    } else if (this.isSelected('label', id)) {
        this.selectionLabel.deselect(id);
        this.selectionDelete.select(id);
    } else {
      this.selectionDelete.deselect(id);
    }
  }

  suggestionToggle(action: string, id: string) {

    let selectionModels = this.selectSelectionModels(action);
    if (selectionModels.currentSelected.isSelected(id)) {
      selectionModels.currentSelected.deselect(id);
    } else {
      selectionModels.currentSelected.select(id);
      selectionModels.currentDeselected.deselect(id);
    }

  }

  masterToggle(action: string) {
    let selectionModels = this.selectSelectionModels(action);
    this.isAllSelected(action) ?
      selectionModels.currentSelected.clear() :
        this.dataSource.getValues().forEach((suggestion) => {
          selectionModels.currentSelected.select(suggestion.id);
          selectionModels.currentDeselected.deselect(suggestion.id);
        })
    }

  isTotalPageSelected() {
    const totalSelectedLength = this.selectionLabel.selected.length + this.selectionDelete.selected.length;
    const totalLength = this.dataSource.getLength();
    if (totalSelectedLength === totalLength) {
      return true;
    }
    return false;
  }

  isAllSelected(action: string) {

    let selectionModel = this.selectSelectionModels(action);
    const numSelected = selectionModel.currentSelected.selected.length;
    const numRows = this.dataSource.getLength();

    return numSelected == numRows;

  }

  isSelected(action: string, id: string) {
    let selectionModel = this.selectSelectionModels(action);
    return selectionModel.currentSelected.isSelected(id);
  }

  selectSelectionModels(action: string) {
    try {
      switch (action) {
        case 'label':
          return { currentSelected: this.selectionLabel, currentDeselected: this.selectionDelete };
        case 'delete':
          return { currentSelected: this.selectionDelete, currentDeselected: this.selectionLabel };

        default:
          throw new Error('Error: ' + action + ' is not one of "label" or "delete"');
      }
    }
    catch(e) {
      console.error(e);
    }
  }

}


export class SuggestionsByCountDataSource extends DataSource<any> {
  private suggestionsSubject = new BehaviorSubject<ISender[]>([]);

  constructor(private store: Store<AppState> ) { // private store: Store<AppState>) {
    super();

  }

  getLength() {
    return this.suggestionsSubject.value.length;
  }

  getValues() {
    return this.suggestionsSubject.value;
  }

  loadSuggestions(page: PageQuery) {
    this.store.pipe(
      select(selectByCountPage(page)),
      tap((suggestions) => {
        this.suggestionsSubject.next(suggestions);
      })
    ).subscribe();
  }

  connect(collectionViewer: CollectionViewer): Observable<ISender[]> {
    return this.suggestionsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.suggestionsSubject.complete();
  }

}
