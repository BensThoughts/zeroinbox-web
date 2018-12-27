import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { LoginCompleteAction } from '@app/core/state/auth/auth.actions';

@Component({
  selector: 'abl-callback',
  template: `
    <p>
      Loading...
    </p>
  `,
  styles: []
})
export class CallbackComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new LoginCompleteAction());

  }
}
