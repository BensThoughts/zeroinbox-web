import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { MatPaginator, MatTable, MatSort } from '@angular/material';
import { Store } from '@ngrx/store';
import {
  AppState,
} from '@app/core';

import { selectSendersFromSuggestionIds } from '../../state/suggestions.selectors';


import { Observable, of, Subscription, fromEvent } from 'rxjs';
import { tap, map, take, delay, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CollectionViewer, SelectionModel } from '@angular/cdk/collections';
import { rowAnimations } from '../animations/rowAnimations';
import { ISender } from '@app/core/state/senders/model/senders.model';
import { AddTasksAction } from '@app/admin-panel/tasks/state/tasks.actions';
import { ITaskCreator } from '@app/admin-panel/tasks/model/tasks.creator.model';
import { SimpleDataSource } from '@app/core/utils/datasource-utils';

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
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('searchInput') input: ElementRef;

  displayedColumns: string[] = ['address'];

  dataSource: SimpleDataSource<ISender>;

  pageSizeOptions: number[] = [5, 10, 25, 100];
  totalRows$: Observable<number>;

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
      selectSendersFromSuggestionIds, 
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
    this.dataSource.loadFilteredData(this.input.nativeElement.value, 'fromAddress');
  }

  updatePaginatorLength() {
    this.dataSource.setFilteredLength(this.input.nativeElement.value, 'fromAddress');
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
        this.updatePaginatorLength();
        this.toggle();
      })
    ).subscribe();

  }
}