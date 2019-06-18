import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth/auth.service';
import {
  AuthActionTypes,
  LoginRequestedAction,
  LoginCompleteAction,
  LogoutAction,
  LoginSuccessAction,
  LoginFailureAction,
  LogoutConfirmedAction,
  LogoutCancelledAction,
  LogoutConfirmedFromOtherWindowAction,
} from './auth.actions';
import { Injectable, NgZone } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { tap, map, exhaustMap, catchError, filter, concatMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { of, fromEvent } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../core.state';
import { 
  LoadBasicProfileAction, 
  ResetUserStateAction, 
  LoadEmailProfileAction } 
from '../user/user.actions';
import { 
  ResetBootstrapStateAction, 
  GetAllSendersAction,
  ToggleSyncToStorageAction 
} from '../bootstrap/bootstrap.actions';
import { BasicProfileResponse, EmailProfileResponse } from '../../services/user/user.service';
import { UserService } from '../../services/user/user.service';

import { LogoutPromptComponent } from '@app/auth/components/logout-prompt/logout-prompt.component';
import { ResetSendersViewStateAction } from '@app/admin-panel/senders/state/senders-view.actions';
import { ResetSendersStateAction } from '../senders/senders.actions';
import { ResetLocalStorageAction } from '../meta-reducers/local-storage-sync-actions';
import { BootstrapAppAction } from '../bootstrap/bootstrap.actions';


@Injectable()
export class AuthEffects {

  /**
   * Effect login$ activates the signIn() flow from the authService.
   * Which pulls in the google auth url from the api and redirects to it.
   */
  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType<LoginRequestedAction>(AuthActionTypes.LoginRequested),
    exhaustMap(() => {
      return this.authService.signIn().pipe(
        map((response) => {
          console.log(response);
          if (response.status === 'error') {
            console.error('Response status_message: ' + response.status_message);
          } else {
            window.location.href = response.data.auth_url;
          }
        }),
        catchError((err) => {
          return of(console.error(err));
        })
      );
    }),
    catchError((err) => {
      return of(console.error(err));
    })
  );


  /**
   * Effect loginComplete$ is called from the /loading page, after the user has been redirected
   * back to the app from a successful google login.  It gets the Basic Profile and Email Profile
   * from the api.  concatMap is needed here so that the EmailProfile is not loaded until the
   * BasicProfile has been obtained.  Server side, the api depends on the Basic Profile for the
   * EmailProfile to successfully load. This is because the BasicProfile includes the userId, which
   * is used to track the user in everything they do.
   */
  @Effect({ dispatch: false })
  loginComplete$ = this.actions$.pipe(
    ofType<LoginCompleteAction>(AuthActionTypes.LoginComplete),
    map(() => {
      this.store.dispatch(new BootstrapAppAction());
      // this.store.dispatch(new LoginSuccessAction()) is dispatched from
      // bootstrap effects so that we can get the firstRun status before showing
      // the homepage
    }),
    catchError(err => of(console.error(err)))
  );


  /**
   * loginRedirect$ redirects the user away from /loading and over to /home
   * after the profiles have been loaded.
   */
  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType<LoginSuccessAction>(AuthActionTypes.LoginSuccess),
    tap(() => {
      this.ngZone.run(() => {
        this.router.navigate([this.authService.authSuccessUrl]);
      });
    })
  );


  /**
   * loginFailureRedirect$ This should really never be called because the server handles
   * login and failures are redirected server side, back to the /login page. However you never
   * really know if a failure could potentially happen client side, so it is best to keep this
   */
  @Effect({ dispatch: false })
  loginFailureRedirect$ = this.actions$.pipe(
    ofType<LoginFailureAction>(AuthActionTypes.LoginFailure),
    tap(() => {
      this.ngZone.run(() => {
        this.router.navigate([this.authService.authFailureUrl]);
      });
    })
  );


  /**
   * logoutConfirmation$ opens the logout dialog to ask the user if they really mean to logout
   */
  @Effect()
  logoutConfirmation$ = this.actions$.pipe(
  ofType<LogoutAction>(AuthActionTypes.Logout),
  exhaustMap(() =>
    this.dialogService
      .open(LogoutPromptComponent)
      .afterClosed()
      .pipe(
        map(confirmed => {
          if (confirmed) {
            return new LogoutConfirmedAction();
          } else {
            return new LogoutCancelledAction();
          }
        })
      )
    )
  );

    /**
   * onChange$ listens for changes to the local-storage so that if the app is open in
   * another tab/window the changes made in the other tab/window will also be reflected in
   * this tab/window.
   */
  @Effect()
  onChange$ = fromEvent<StorageEvent>(window, 'storage').pipe(
    // listen to our storage key
    filter((evt) => {
      return evt.key === 'go-app-auth';
    }),
    filter(evt => evt.newValue !== null),
    map(evt => {

      let authenticated = JSON.parse(evt.newValue).isAuthenticated;

      if (authenticated) {
        return new LoginSuccessAction();
      } else {
        return new LogoutConfirmedFromOtherWindowAction();
      }
    })
  );


  /**
   * Effect logoutConfirmed$ resets the state and sends a request to the api
   * to destroy the current session on the server
   */
  @Effect({ dispatch: false })
  logoutConfirmed$ = this.actions$.pipe(
    ofType<LogoutConfirmedAction>(AuthActionTypes.LogoutConfirmed),
    tap( () => {
      this.authService.logout();
      this.store.dispatch(new ToggleSyncToStorageAction({ syncToStorage: false }));
      this.store.dispatch(new ResetLocalStorageAction());

      this.store.dispatch(new ResetSendersStateAction());
      this.store.dispatch(new ResetUserStateAction());
      this.store.dispatch(new ResetSendersViewStateAction());
      this.store.dispatch(new ResetBootstrapStateAction());
      
      this.router.navigate([this.authService.logoutUrl]);
    })
  );

  /**
   * [Effect logoutConfirmedFromOtherWindow$ resets the state but does not send the request
   * to destroy the session because that has already been done from another tab/window if
   * this is being called. ToggleSyncToStorage is used so that we don't end up in a loop between
   * two or more windows/tabs, all tabs confirmed from "other window" will not write to localStorage.
   */
  @Effect({ dispatch: false })
  logoutConfirmedFromOtherWindow$ = this.actions$.pipe(
    ofType<LogoutConfirmedFromOtherWindowAction>(AuthActionTypes.LogoutConfirmedFromOtherWindow),
    tap( () => {
      this.store.dispatch(new ToggleSyncToStorageAction({ syncToStorage: false }));

      this.store.dispatch(new ResetSendersStateAction());
      this.store.dispatch(new ResetUserStateAction());
      this.store.dispatch(new ResetSendersViewStateAction());
      this.store.dispatch(new ResetBootstrapStateAction());

      this.router.navigate([this.authService.logoutUrl]);

      // this.store.dispatch(new ResetLocalStorageAction());
      // this.authService.logout();
    })
  );

constructor(
  private actions$: Actions,
  private authService: AuthService,
  private userService: UserService,
  private router: Router,
  private dialogService: MatDialog,
  private ngZone: NgZone,
  private store: Store<AppState>
) {}
}
