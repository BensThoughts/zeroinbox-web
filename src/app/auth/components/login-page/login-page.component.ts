import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { LoginRequestedAction } from '@app/core/state/auth/auth.actions';


@Component({
  selector: 'go-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {

  constructor(private store: Store<AppState>) {}

  ngOnInit() { }
  public signIn() {
    this.store.dispatch(new LoginRequestedAction());
  }

}
