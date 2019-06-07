import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { LoginRequestedAction } from '@app/core/state/auth/auth.actions';


@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})

export class LoginCardComponent implements OnInit {

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() { }
  public signIn() {
    this.store.dispatch(new LoginRequestedAction());
  }

}
