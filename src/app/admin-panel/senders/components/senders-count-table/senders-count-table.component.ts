import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ElementRef, Input } from '@angular/core';
import { MatPaginator, MatTable, MatSort, MatTableDataSource } from '@angular/material';
import { Store } from '@ngrx/store';
import {
  AppState,
} from '@app/core';

import {
  selectSendersByCount
} from '../../state/senders-view.selectors';

import { Observable, of, Subscription, fromEvent } from 'rxjs';
import { tap, map, take, delay, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { rowAnimations } from '../../animations/rowAnimations';
import { ISender } from '@app/core/state/senders/model/senders.model';
import { SimpleDataSource } from '@app/core/utils/datasource-utils';

import { 
  LabelSenderDialogAction,
  DeleteSenderDialogAction,
  DeleteAllSendersDialogAction,
  LabelAllSendersDialogAction
} from '../../state/senders-view.actions';

@Component({
  selector: 'app-senders-count-table',
  templateUrl: './senders-count-table.component.html',
  styleUrls: ['./senders-count-table.component.scss'],
  animations: [rowAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SendersCountTableComponent implements OnInit {


  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('searchInput') input: ElementRef;

  displayedColumns: string[] = ['threadIdCount'];

  dataSource: SimpleDataSource<ISender>;

  pageSizeOptions: number[] = [5, 10, 25, 100];
  totalRows$: Observable<number>;

  handler1: Subscription;
  handler2: Subscription;

  @Input() test2: Observable<ISender>;

  myRemoved = true;


   toggle() {
     this.myRemoved = !this.myRemoved;
   }

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.dataSource = new SimpleDataSource(
      this.store, 
      selectSendersByCount, 
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
    this.dataSource.loadFilteredData(this.input.nativeElement.value.toLowerCase(), 'fromAddress');
  }

  updatePaginatorLength() {
    this.dataSource.setFilteredLength(this.input.nativeElement.value.toLowerCase(), 'fromAddress');
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

  labelSender(suggestion: ISender) {
    this.store.dispatch(new LabelSenderDialogAction({ sender: suggestion }));
  }

  deleteSender(suggestion: ISender) {
    this.store.dispatch(new DeleteSenderDialogAction({ sender: suggestion }));
  }

  deleteAll() {
    let senders = this.dataSource.getValues();
    this.store.dispatch(new DeleteAllSendersDialogAction({ senders: senders }))
  }

  labelAll() {
    let senders = this.dataSource.getValues();
    this.store.dispatch(new LabelAllSendersDialogAction({ senders: senders }))
  }
}