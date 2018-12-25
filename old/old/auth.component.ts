import { Component, OnInit } from '@angular/core';

//import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoginState } from '../ngrx-store/login.model';
import { LoginInitiated, LoginSuccess } from '../ngrx-store/login.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logged_in$: Observable<boolean>;

  constructor(
//    public afAuth: AngularFireAuth,
    private store: Store<LoginState>
  ) {
    this.logged_in$ = store.state.isAuthenticated;
    console.log(this.logged_in$);

    //this.logged_in$ = store.pipe(
      //select('auth'),
      //map(auth => auth.isAuthenticated)
    //);
  }

  login() {
    this.store.dispatch(new LoginSuccess());
    //this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
  //  this.afAuth.auth.signOut();
  }

  ngOnInit() {
  }

}
