import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core';
import { selectSubscriptionSenders } from '../state/subscriptions.selectors';
import { MatSort, MatPaginator, PageEvent, Sort } from '@angular/material';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { fromMatPaginator, paginateRows, fromMatSort, sortRows } from '../../../core/utils/datasource-utils';
import { ISender } from '@app/core/state/senders/model/senders.model';

@Component({
  selector: 'app-subscriptions-component',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriptionsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  subscriptions$: Observable<ISender[]>;
  // subscriptions$: Subscription;
  totalRows$: Observable<number>;
  displayedRows$: Observable<TestData[]>;

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    const pageEvents$: Observable<PageEvent> = fromMatPaginator(this.paginator);
    const sortEvents$: Observable<Sort> = fromMatSort(this.sort);


    this.subscriptions$ = this.store.pipe(select(selectSubscriptionSenders));
    this.totalRows$ = this.subscriptions$.pipe(map(rows => rows.length));

    this.displayedRows$ = this.subscriptions$.pipe(
      sortRows(sortEvents$),
      paginateRows(pageEvents$)
    );
  }

  ngAfterViewInit() {
  }


}

export interface TestData {
  fromName: string;
  count: number;
  fromAddress: string;
}

export const testData: TestData[] = [
  {
    fromName: 'test1',
    fromAddress: 'test1',
    count: 10
  },
  {
    fromName: 'test2',
    fromAddress: 'test2',
    count: 5
  }
]
