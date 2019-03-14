import { Component, OnInit, ViewChild, Input, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { MatPaginator, MatTable } from '@angular/material';
import { Store, select } from '@ngrx/store';
import {
  AppState,
} from '@app/core';

import {
  selectBySizeGroupPage,
  selectBySizeGroupLength,
  selectSizeGroup,
  PageQuery,
} from '../../state/suggestions.selectors';

import {
  SetSizeCutoffAction,
} from '../../state/suggestions.actions';


import { Observable, of, BehaviorSubject, Subscription, fromEvent } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { tap, map, take, delay, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CollectionViewer, SelectionModel } from '@angular/cdk/collections';
import { ISuggestion } from '../../model/suggestions.model';
import { rowAnimations } from './rowAnimations';
import { ISender } from '../../../../core/state/senders/model/senders.model';
import { AddTasksAction } from '../../../tasks/state/tasks.actions';
import { ITaskCreator } from '../../../tasks/model/tasks.creator.model';


@Component({
  selector: 'go-suggestions-size-table',
  templateUrl: './suggestions-size-table.component.html',
  styleUrls: ['./suggestions-size-table.component.scss'],
  animations: [rowAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SuggestionsSizeTableComponent implements OnInit {


  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('searchInput') input: ElementRef;

  @Input() myData: Observable<ISuggestion[]>;

  displayedColumns: string[] = ['address'];

  dataSource: SuggestionsBySizeDataSource;

  length;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  selectionDelete = new SelectionModel<string>(true, []);
  selectionLabel = new SelectionModel<string>(true, []);

  collectionViewer: CollectionViewer;
  mySub: Observable<ISender[]>;

  sizeCutoff$: Observable<string>;
  sizeCutoffs = [
    { value: 'ALL', label: 'any size email' },
    { value: 'XS', label: 'extra small emails' },
    { value: 'SM', label: 'small emails' },
    { value: 'MD', label: 'medium emails' },
    { value: 'LG', label: 'large emails' },
    { value: 'XL', label: 'extra large emails' }
  ];

  handler: Subscription;

  myRemoved = true;

   toggle() {
     this.myRemoved = !this.myRemoved;
   }

  constructor(private store: Store<AppState>) { }

  ngOnInit() {

    this.sizeCutoff$ = this.store.pipe(select(selectSizeGroup));

    this.dataSource = new SuggestionsBySizeDataSource(this.store);


    const initialPage: PageQuery = {
      pageIndex: 0,
      pageSize: this.pageSize
    };

    this.dataSource.loadSuggestions(this.input.nativeElement.value, initialPage);

    this.updatePaginatorLength();



  }

  ngAfterViewInit() {

    fromEvent(this.input.nativeElement, 'keyup')
    .pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap(() => {
        this.paginator.pageIndex = 0;
        this.loadSuggestionsPage();
        this.updatePaginatorLength();
      })
    ).subscribe();
  
    this.paginator.page.pipe(
      tap(() => this.loadSuggestionsPage())
    ).subscribe();

  }


  onCutoffSelect({ value: cutoff }) {
    this.store.dispatch(new SetSizeCutoffAction({ sizeCutoff: cutoff }));

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

      this.dataSource.loadSuggestions(
        this.input.nativeElement.value,  
        newPage
      );
  }

  updatePaginatorLength() {
    this.store.pipe(
      select(selectBySizeGroupLength(this.input.nativeElement.value)),
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


  createTasks() {
    this.toggle();

    let deleteTasks = this.selectionDelete.selected;
    let labelTasks = this.selectionLabel.selected;
    this.store.pipe(
      select(selectSizeGroup),
      map((cutoff) => {
        let tasks: ITaskCreator = {
          deleteTasks: deleteTasks,
          labelBySizeTasks: labelTasks,
          labelByNameTasks: [],
          bySizeLabelName: cutoff
        };
    
        this.store.dispatch(new AddTasksAction({ tasks: tasks }))
      })
    ).subscribe();


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
    let selectionModels = this.selectSelectionModels(action);
    return selectionModels.currentSelected.isSelected(id);
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


export class SuggestionsBySizeDataSource extends DataSource<any> {
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

  loadSuggestions(filter: string, page: PageQuery) {
    this.store.pipe(
      select(selectBySizeGroupPage(filter, page)),
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
