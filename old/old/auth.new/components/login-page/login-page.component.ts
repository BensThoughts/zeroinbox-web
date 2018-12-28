import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
//import * as fromStore from '@app/state';
//import { Login } from '@app/auth/actions/auth.actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {
  //constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {}

//  onLogin() {
//    this.store.dispatch(new Login());
  }
}
