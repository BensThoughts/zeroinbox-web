import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  ElementRef,
  Input,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';

import { Observable, of, Subscription, fromEvent } from 'rxjs';
import {
  tap,
  map,
  take,
  delay,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';
import { rowAnimations } from '../../animations/rowAnimations';
import { ISender } from '@app/core/state/senders/model/senders.model';
import { SimpleDataSource } from '@app/core/utils/datasource-utils';
import { UnsubscribeDialogAction } from '../../state/subscriptions.actions';
import { selectSubscriptionsByName } from '../../state/subscriptions.selectors';

@Component({
  selector: 'app-subscriptions-table',
  templateUrl: './subscriptions-table.component.html',
  styleUrls: ['./subscriptions-table.component.scss'],
  animations: [rowAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriptionsTableComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('searchInput') input: ElementRef;

  displayedColumns: string[] = ['count'];

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

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.dataSource = new SimpleDataSource(
      this.store,
      selectSubscriptionsByName,
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
      )
      .subscribe();

    this.handler2 = this.paginator.page
      .pipe(tap(() => this.loadSuggestionsPage()))
      .subscribe();
  }

  ngOnDestroy() {
    this.handler1.unsubscribe();
    this.handler2.unsubscribe();
  }

  loadSuggestionsPage() {
    this.dataSource.loadFilteredData(
      this.input.nativeElement.value.toLowerCase(),
      'fromAddress'
    );
  }

  updatePaginatorLength() {
    this.dataSource.setFilteredLength(
      this.input.nativeElement.value.toLowerCase(),
      'fromAddress'
    );
  }

  createActions() {
    this.toggle();

    of(true)
      .pipe(
        take(1),
        delay(100),
        map(() => {
          if (
            !this.paginator.hasNextPage() &&
            this.paginator.hasPreviousPage()
          ) {
            if (this.dataSource.getLength() === 0) {
              this.paginator.previousPage();
            }
          }
          this.updatePaginatorLength();
          this.toggle();
        })
      )
      .subscribe();
  }

  unsubscribe(suggestion: ISender) {
    this.store.dispatch(new UnsubscribeDialogAction({ sender: suggestion }));
  }
}
