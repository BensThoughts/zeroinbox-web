import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState, selectSendersLoaded } from '@app/core';
import { LoadAllDataRequestAction } from '@app/core/state/bootstrap/bootstrap.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-subscriptions-component',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriptionsComponent implements OnInit {
  sendersLoaded$: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new LoadAllDataRequestAction());
    this.sendersLoaded$ = this.store.pipe(select(selectSendersLoaded));
  }
}
