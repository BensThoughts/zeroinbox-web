import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core';
import { selectSubscriptionSenders } from '../state/subscriptions.selectors';

@Component({
  selector: 'app-subscriptions-component',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {

  subscriptions$;

  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subscriptions$ = this.store.pipe(select(selectSubscriptionSenders));
  }

}
