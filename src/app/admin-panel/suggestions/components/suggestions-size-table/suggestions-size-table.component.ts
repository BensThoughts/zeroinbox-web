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

import { SimpleDataSource } from '@app/core/utils/datasource-utils';
import { selectSendersBySizeGroupFiltered } from '../../state/suggestions.selectors';


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

  displayedColumns: string[] = ['totalSizeEstimate'];

  dataSource: SimpleDataSource<ISender>;

  pageSizeOptions: number[] = [5, 10, 25, 100];
  totalRows$: Observable<number>;

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
      selectSendersBySizeGroupFiltered,
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
    this.paginator.firstPage();
  }


  loadSuggestionsPage() {
    this.dataSource.loadFilteredData(this.input.nativeElement.value, 'fromAddress');
  }

  updatePaginatorLength() {
    this.dataSource.setFilteredLength(this.input.nativeElement.value, 'fromAddress');
  }


  createActions() {
    this.toggle();
    this.store.pipe(
      select(selectSizeGroup),
      take(1),
      map((sizeGroup) => {
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
        this.updatePaginatorLength();
        this.toggle();
      })
    ).subscribe();

  }

}
