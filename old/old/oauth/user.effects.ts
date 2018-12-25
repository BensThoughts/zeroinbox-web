import { Injectable }                 from '@angular/core';
import { Effect, Actions, ofType }    from '@ngrx/effects';
import { User }                       from './user.model';

import { AngularFireAuth }            from '@angular/fire/auth';
import * as firebase                  from 'firebase';

import { Observable }                 from 'rxjs';
import { fromPromis, of }             from 'rxjs/observable';
import { map, switchMap, catch, delay } from 'rxjs/operator';

import {
  GetUser,
  Authenticated,
  NotAuthenticated
  GoogleLogin,
  AuthError,
  Logout,
  AuthActionTypes
} from './user.actions';

//export type Action = userActions.All;


@Injectable()
export class UserEffects {
    constructor(
      private actions$: Actions<Action>,
      private afAuth: AngularFireAuth
    ) {}

    /// effects go here
    @Effect()
    login:  Observable<Action> = this.actions.ofType(userActions.GOOGLE_LOGIN)

        .map((action: userActions.GoogleLogin) => action.payload)
        .switchMap(payload => {
            return Observable.fromPromise( this.googleLogin() );
        })
        .map( credential => {
            // successful login
            return new userActions.GetUser();
        })
        .catch(err => {
            return Observable.of(new userActions.AuthError({error: err.message}));
        });


/*
    @Effect()
    getUser = this.action$.pipe(
      ofType<GetUser>(AuthActionTypes.GET_USER),
      map((action: userActions.GetUser) => action.payload).pipe(
          switchMap(payload => this.afAuth.authState).pipe(
            map(authData)
          )
      )

    )

    @Effect({ dispatch: false })
    login = this.actions$.pipe(
      ofType<ActionAuthLogin>(AuthActionTypes.LOGIN),
      tap(() =>
        this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: true })
      )
    );

    @Effect()
    getUser:  Observable<Action> = this.actions.ofType(userActions.GET_USER)

       .map((action: userActions.GetUser) => action.payload )
       .switchMap(payload => this.afAuth.authState )
       .delay(2000) // delay to show loading spinner, delete me!
       .map( authData => {
           if (authData) {
               /// User logged in
               const user = new User(authData.uid, authData.displayName);
               return new userActions.Authenticated(user);
           } else {
               /// User not logged in
               return new userActions.NotAuthenticated();
           }

       })
       .catch(err =>  Observable.of(new userActions.AuthError()) );

      @Effect()
      login:  Observable<Action> = this.actions.ofType(userActions.GOOGLE_LOGIN)

          .map((action: userActions.GoogleLogin) => action.payload)
          .switchMap(payload => {
              return Observable.fromPromise( this.googleLogin() );
          })
          .map( credential => {
              // successful login
              return new userActions.GetUser();
          })
          .catch(err => {
              return Observable.of(new userActions.AuthError({error: err.message}));
          });


      private googleLogin(): firebase.Promise<any> {
          const provider = new firebase.auth.GoogleAuthProvider();
          return this.afAuth.auth.signInWithPopup(provider);
      }

      @Effect()
logout:  Observable<Action> = this.actions.ofType(userActions.LOGOUT)

    .map((action: userActions.Logout) => action.payload )
    .switchMap(payload => {
        return Observable.of( this.afAuth.auth.signOut() );
    })
    .map( authData => {
        return new userActions.NotAuthenticated();
    })
    .catch(err => Observable.of(new userActions.AuthError({error: err.message})) );

}
*/
