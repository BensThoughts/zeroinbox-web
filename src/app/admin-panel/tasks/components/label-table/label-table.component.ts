import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { MatPaginator, MatTable, PageEvent, Sort, MatSort } from '@angular/material';
import { Store, select } from '@ngrx/store';
import {
  AppState,
} from '@app/core';


import { Observable, of, Subscription, fromEvent } from 'rxjs';
import { tap, map, take, delay, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { rowAnimations } from '../../animations/rowAnimations';
import { ISender } from '@app/core/state/senders/model/senders.model';
import { AddTasksAction } from '@app/admin-panel/tasks/state/tasks.actions';
import { ITaskCreator } from '@app/admin-panel/tasks/model/tasks.creator.model';
import { SimpleDataSource } from '@app/core/utils/datasource-utils';
import { selectLabelTasks } from '../../state/tasks.selectors';
import { LabelTasks } from '../../model/label-tasks.model';

@Component({
  selector: 'app-label-table',
  templateUrl: './label-table.component.html',
  styleUrls: ['./label-table.component.scss'],
  animations: [rowAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class LabelTableComponent implements OnInit {


  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('searchInput') input: ElementRef;

  displayedColumns: string[] = ['address'];

  dataSource: SimpleDataSource<LabelTasks>;

  pageSizeOptions: number[] = [5, 10, 25, 100];
  totalRows$: Observable<number>;

  selectionFilter = new SelectionModel<string>(true, []);

  mySub: Observable<ISender[]>;

  handler1: Subscription;
  handler2: Subscription;

  myRemoved = true;


   toggle() {
     this.myRemoved = !this.myRemoved;
   }

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.dataSource = new SimpleDataSource(
      this.store, 
      selectLabelTasks, 
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
  
    this.handler2 = this.paginator.page
    .pipe(
      tap(() => this.loadSuggestionsPage())
    ).subscribe();

  }

  ngOnDestroy() {
    this.handler1.unsubscribe();
    this.handler2.unsubscribe();
  }


  loadSuggestionsPage() {
    this.clearSelections();
    this.dataSource.loadFilteredData(this.input.nativeElement.value, 'fromAddress');
  }

  updatePaginatorLength() {
    this.dataSource.setFilteredLength(this.input.nativeElement.value, 'fromAddress');
  }


  clearSelections() {
    this.selectionFilter.clear();
  }


  createActions() {

    this.toggle();

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
    this.filterToggle(id);
  }

  filterToggle(id: string) {
    if (this.selectionFilter.isSelected(id)) {
      this.selectionFilter.deselect(id);
    } else {
      this.selectionFilter.select(id);
    }
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selectionFilter.clear() :
        this.dataSource.getValues().forEach((suggestion) => {
          this.selectionFilter.select(suggestion.senderId);
        });
    }

  isTotalPageSelected() {
    const totalSelectedLength = this.selectionFilter.selected.length;
    const totalLength = this.dataSource.getLength();
    if (totalSelectedLength === totalLength) {
      return true;
    }
    return false;
  }

  isAllSelected() {
    const numSelected = this.selectionFilter.selected.length;
    const numRows = this.dataSource.getLength();
    return numSelected == numRows;
  }

  isSelected(id: string) {
    return this.selectionFilter.isSelected(id);
  }

}