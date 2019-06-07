import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { LoginCompleteAction } from '@app/core/state/auth/auth.actions';

/**
 * This page is displayed after login and before the app has loaded
 */

@Component({
  selector: 'go-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new LoginCompleteAction());
  }
}
