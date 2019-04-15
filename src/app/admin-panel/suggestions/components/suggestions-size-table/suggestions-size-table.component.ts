import { Component, OnInit, ViewChild, Input, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { MatPaginator, MatTable, MatSort } from '@angular/material';
import { Store, select } from '@ngrx/store';
import {
  AppState,
} from '@app/core';

import {
  selectSizeGroup,
} from '../../state/suggestions.selectors';

import {
  SetSizeCutoffAction,
} from '../../state/suggestions.actions';


import { Observable, of, Subscription, fromEvent } from 'rxjs';
import { tap, map, take, delay, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CollectionViewer, SelectionModel } from '@angular/cdk/collections';
import { ISuggestion } from '../../model/suggestions.model';
import { rowAnimations } from '../animations/rowAnimations';
import { ISender } from '../../../../core/state/senders/model/senders.model';
import { AddTasksAction } from '../../../tasks/state/tasks.actions';
import { ITaskCreator } from '@app/admin-panel/tasks/model/tasks.creator.model';
import { SimpleDataSource } from '@app/core/utils/datasource-utils';
import { selectBySizeGroupFiltered } from '../../state/suggestions.selectors';


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
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('searchInput') input: ElementRef;

  @Input() myData: Observable<ISuggestion[]>;

  displayedColumns: string[] = ['address'];

  dataSource: SimpleDataSource<ISender>;

  pageSizeOptions: number[] = [5, 10, 25, 100];
  totalRows$: Observable<number>;

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

  handler1: Subscription;
  handler2: Subscription;

  myRemoved = true;

   toggle() {
     this.myRemoved = !this.myRemoved;
   }

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.sizeCutoff$ = this.store.pipe(select(selectSizeGroup));

    this.dataSource = new SimpleDataSource(
      this.store,
      selectBySizeGroupFiltered,
      this.paginator,
      this.sort
    );

    this.totalRows$ = this.dataSource.getFilteredLength();
  }

  ngAfterViewInit() {

    this.loadSuggestionsPage();
    this.updatePaginatorLength();


    this.handler1 = fromEvent(this.input.nativeElement, 'keyup')
    .pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap(() => {
        this.paginator.pageIndex = 0;
        this.loadSuggestionsPage();
        this.updatePaginatorLength();
      })
    ).subscribe();
  
    this.handler2 = this.paginator.page.pipe(
      tap(() => this.loadSuggestionsPage())
    ).subscribe();

  }

  ngOnDestroy() {
    this.handler1.unsubscribe();
    this.handler2.unsubscribe();
  }


  onCutoffSelect({ value: cutoff }) {
    this.store.dispatch(new SetSizeCutoffAction({ sizeCutoff: cutoff }));

    this.updatePaginatorLength();
    this.clearSelections();
    this.paginator.firstPage();
  }


  loadSuggestionsPage() {
    this.clearSelections();
    this.dataSource.loadFilteredData(this.input.nativeElement.value, 'fromAddress');
  }

  updatePaginatorLength() {
    this.dataSource.setFilteredLength(this.input.nativeElement.value, 'fromAddress');
  }


  clearSelections() {
    this.selectionDelete.clear();
    this.selectionLabel.clear();
  }


  createActions() {
    this.toggle();

    let deleteTaskSenderIds = this.selectionDelete.selected;
    let labelBySizeSenderIds = this.selectionLabel.selected;
    this.store.pipe(
      select(selectSizeGroup),
      take(1),
      map((sizeGroup) => {
        let tasks: ITaskCreator = {
          deleteTaskSenderIds: deleteTaskSenderIds,
          labelBySizeSenderIds: labelBySizeSenderIds,
          labelByNameSenderIds: [],
        };
    
        this.store.dispatch(new AddTasksAction({ tasks: tasks }))
      })
    ).subscribe();


    of(true).pipe(
      take(1),
      delay(100),
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
          selectionModels.currentSelected.select(suggestion.senderId);
          selectionModels.currentDeselected.deselect(suggestion.senderId);
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
