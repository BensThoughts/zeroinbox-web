import { Component, OnInit } from '@angular/core';

import { Store }        from '@ngrx/store';
import { Observable }   from 'rxjs/Observable';

import { User }         from './user.model';
import * as userActions from './user.actions';

interface AppState {
  user: User;
}

@Component({
  selector: 'oauth-login',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.scss']
})
export class OauthComponent implements OnInit {

  user$: Observable<User>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.user$ = this.store.select('user');

    this.store.dispatch(new userActions.GetUser());
  }

  googleLogin() {
    this.store.dispatch(new userActions.GoogleLogin());
  }

  logout() {
    this.store.dispatch(new userActions.Logout());
  }

}
