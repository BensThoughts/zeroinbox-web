import { Component, OnInit, ViewChild, Input, ChangeDetectionStrategy } from '@angular/core';
import { PageEvent, MatTableDataSource, MatPaginator, MatTable } from '@angular/material';
import { Store, select } from '@ngrx/store';
import {
  AppState,
} from '@app/core';

import {
  selectPageOfSuggestions_CountMoreThan,
  selectLengthOfSuggestions_CountMoreThan,
  selectCutoff,
} from '../../state/suggestions.selectors';

import {
  SetCutoffAction,
  DeleteSuggestionsAction,
  LabelByNameSuggestionsAction,
} from '../../state/suggestions.actions';


import { Observable, of, BehaviorSubject, Subscription } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { tap, map, take, delay } from 'rxjs/operators';
import { CollectionViewer, SelectionModel } from '@angular/cdk/collections';
import { ISuggestion } from '../../state/suggestions.model';
import { rowAnimations } from './rowAnimations';

export interface PageQuery {
  pageIndex: number;
  pageSize:number;
}

@Component({
  selector: 'go-suggestions-table',
  templateUrl: './suggestions-table.component.html',
  styleUrls: ['./suggestions-table.component.scss'],
  animations: [rowAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SuggestionsTableComponent implements OnInit {


  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() myData: Array<ISuggestion>;

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
    { value: 5, label: '5 threads' },
    { value: 10, label: '10 threads' },
    { value: 20, label: '20 threads' },
    { value: 50, label: '50 threads' }
  ];

  handler: Subscription;

  myRemoved = true;


   toggle() {
     this.myRemoved = !this.myRemoved;
     // return this.isRemoved;
   }

  constructor(private store: Store<AppState>) { }

  ngOnInit() {

    this.cutoff$ = this.store.pipe(select(selectCutoff));

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
    this.store.dispatch(new SetCutoffAction({ cutoff: cutoff }));
    // this.dataSource.reloadSuggestions();

    this.updatePaginatorLength();
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
      select(selectLengthOfSuggestions_CountMoreThan),
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
    // console.log(this.selectionDelete.selected);
    this.toggle();
    if (this.selectionDelete.hasValue()) {
      this.store.dispatch(new DeleteSuggestionsAction({ ids: this.selectionDelete.selected }));
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
    if (selectionModels[0].isSelected(id)) {
      selectionModels[0].deselect(id);
    } else {
      selectionModels[0].select(id);
      selectionModels[1].deselect(id);
    }

  }

  masterToggle(action: string) {
    let selectionModels = this.selectSelectionModels(action);
    this.isAllSelected(action) ?
      selectionModels[0].clear() :
        this.dataSource.getValues().forEach((suggestion) => {
          selectionModels[0].select(suggestion.id);
          selectionModels[1].deselect(suggestion.id);
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

    let selectionModel = this.selectSelectionModels(action)[0];
    const numSelected = selectionModel.selected.length;
    const numRows = this.dataSource.getLength();

    return numSelected == numRows;

  }

  isSelected(action: string, id: string) {
    let selectionModels = this.selectSelectionModels(action)[0];
    return selectionModels.isSelected(id);
  }

  selectSelectionModels(action: string) {
    try {
      switch (action) {
        case 'label':
          return [this.selectionLabel, this.selectionDelete];
        case 'delete':
          return [this.selectionDelete, this.selectionLabel];

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


  getLength() {
    return this.suggestionsSubject.value.length;
  }

  getValues() {
    return this.suggestionsSubject.value;
  }

  loadSuggestions(page: PageQuery) {
    // this.page = page;
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
