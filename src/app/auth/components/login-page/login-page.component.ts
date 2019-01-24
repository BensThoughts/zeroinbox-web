import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

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
    // private userService: UserService) { }

  ngOnInit() { }
  // used to sign a google user in
  //  signOut() in implemented in app.component.ts
  public signIn() {
    this.store.dispatch(new LoginRequestedAction());
    // this.userService.signIn();
  }

}
