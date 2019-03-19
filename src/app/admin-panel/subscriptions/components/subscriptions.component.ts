import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core';
import { selectSubscriptionSenders } from '../state/subscriptions.selectors';
import { MatSort, MatPaginator, PageEvent, Sort } from '@angular/material';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { fromMatPaginator, paginateRows, fromMatSort, sortRows } from '../state/datasource-utils';
import { ISender } from '@app/core/state/senders/model/senders.model';

@Component({
  selector: 'app-subscriptions-component',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
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
    const rows$ = of(testData);

    // this.subscriptions$ = this.store.pipe(select(selectSubscriptionSenders));
    // this.displayedRows$ = this.subscriptions$.pipe(
    //  sortRows(sortEvents$),
    //  paginateRows(pageEvents$)
    // );
    this.displayedRows$ = rows$.pipe(
      sortRows(sortEvents$),
      paginateRows(pageEvents$)
    )
    this.totalRows$ = rows$.pipe(
      map(rows => rows.length)
    ) 
    // this.totalRows$ = this.subscriptions$.pipe(map(rows => rows.length));
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
