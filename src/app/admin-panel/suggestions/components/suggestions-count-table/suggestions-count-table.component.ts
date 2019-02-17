import { Component, OnInit, ViewChild, Input, ChangeDetectionStrategy } from '@angular/core';
import { PageEvent, MatTableDataSource, MatPaginator, MatTable } from '@angular/material';
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

  // @Input() myData: Observable<ISuggestion[]>;

  displayedColumns: string[] = ['address'];

  // dataSource: SuggestionsDataSource;
  dataSource: SuggestionsDataSource;// MatTableDataSource<ISuggestion>;

  length;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  selectionDelete = new SelectionModel<string>(true, []);
  selectionLabel = new SelectionModel<string>(true, []);

  collectionViewer: CollectionViewer;
  mySub: Observable<ISuggestion[]>;

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
     // return this.isRemoved;
   }

  constructor(private store: Store<AppState>) { }

  ngOnInit() {

    this.cutoff$ = this.store.pipe(select(selectCountCutoff));
    this.lengthOfSuggestions_CountMoreThan$ = this.store.pipe(select(selectByCountLength));
    // this.dataSource = new SuggestionsDataSource(this.store);
    // this.dataSource = new MatTableDataSource(this.myData)
    this.dataSource = new SuggestionsDataSource(this.store);


    const initialPage: PageQuery = {
      pageIndex: 0,
      pageSize: this.pageSize
    };

    this.dataSource.loadSuggestions(initialPage);
    // this.paginator.length = this.dataSource.getLength();
    // this.dataSource.paginator = this.paginator;
    this.updatePaginatorLength();



  }

  ngAfterViewInit() {
  this.paginator.page.pipe(
    tap(() => this.loadSuggestionsPage())
  ).subscribe();

  }


  onCutoffSelect({ value: cutoff }) {
    // this.clearSelections();
    this.store.dispatch(new SetCountCutoffAction({ countCutoff: cutoff }));
    // this.dataSource.reloadSuggestions();

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
    if (this.selectionDelete.hasValue()) {
      this.store.dispatch(new DeleteSuggestionsMetaAction({ ids: this.selectionDelete.selected }));
    }

    if (this.selectionLabel.hasValue()) {
      this.store.dispatch(new LabelByNameSuggestionsAction({ ids: this.selectionLabel.selected }));
    }

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
    console.log('Total length: ' + totalLength);
    console.log('Selected length: ' + totalSelectedLength);
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


export class SuggestionsDataSource extends DataSource<any> {
  private suggestionsSubject = new BehaviorSubject<ISuggestion[]>([]);

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

    console.log(page);
    this.store.pipe(
      select(selectByCountPage(page)),
      tap((suggestions) => {
        this.suggestionsSubject.next(suggestions);
      })
    ).subscribe();

  }

  connect(collectionViewer: CollectionViewer): Observable<ISuggestion[]> {
    return this.suggestionsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.suggestionsSubject.complete();
  }

}
