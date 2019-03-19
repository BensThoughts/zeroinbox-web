import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core';
import { selectSubscriptionSenders } from '../state/subscriptions.selectors';
import { MatSort, MatPaginator, PageEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { fromMatPaginator, paginateRows } from '../state/datasource-utils';
import { ISender } from '@app/core/state/senders/model/senders.model';

@Component({
  selector: 'app-subscriptions-component',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriptionsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  subscriptions$: Observable<ISender[]>;
  totalRows$: Observable<number>;
  displayedRows$: Observable<ISender[]>;

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    const pageEvents$: Observable<PageEvent> = fromMatPaginator(this.paginator);
    this.subscriptions$ = this.store.pipe(select(selectSubscriptionSenders));
    this.displayedRows$ = this.subscriptions$.pipe(paginateRows(pageEvents$)); 
    this.totalRows$ = this.subscriptions$.pipe(map(rows => rows.length));
  }

}
