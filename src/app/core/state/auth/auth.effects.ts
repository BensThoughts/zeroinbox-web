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
import { LogoutPromptComponent } from '@app/auth/components/logout-prompt/logout-prompt.component';
import { Store } from '@ngrx/store';
import { AppState } from '../core.state';
import { 
  LoadBasicProfileAction, 
  ResetUserStateAction, 
  LoadEmailProfileAction } 
from '../user/user.actions';
import { 
  ResetBootstrapStateAction, 
  GetAllSuggestionsAction,
  SyncToStorageAction 
} from '../bootstrap/bootstrap.actions';
import { ResetTasksStateAction } from '../tasks/tasks.actions';
import { ResetSuggestionsStateAction } from '@app/admin-panel/suggestions/state/suggestions.actions';
import { BasicProfileResponse, EmailProfileResponse } from '../../services/user/user.service';
import { UserService } from '@app/core/services/user/user.service';


@Injectable()
export class AuthEffects {

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
   * [Effect login$ activates the signIn() flow from the authService]
   */
  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType<LoginRequestedAction>(AuthActionTypes.LoginRequested),
    tap(() => {
      this.authService.signIn();
    })
  );


  /**
   * [Effect loginComplete$ calls signInSuccessHandler, which stores the
   * access_token in session storage]
   */
  @Effect({ dispatch: false })
  loginComplete$ = this.actions$.pipe(
    ofType<LoginCompleteAction>(AuthActionTypes.LoginComplete),
    concatMap(() => {
      return this.userService.getBasicProfile().pipe(
        map((response: BasicProfileResponse) => {
          if (response.status === 'error') {
            console.error('Error getting basic profile: ' + response.status_message)
          } else {
            this.store.dispatch(new LoadBasicProfileAction(response.data.basic_profile));
          }
        })
      );
    }),
    concatMap(() => {
      return this.userService.getEmailProfile().pipe(
        map((response: EmailProfileResponse) => {
          if (response.status === 'error') {
            console.error('Error getting email profile: ' + response.status_message)
          }
        this.store.dispatch(new LoadEmailProfileAction(response.data.email_profile));
        })
      );
    }),
    map(() => {
      this.store.dispatch(new LoginSuccessAction())
      this.store.dispatch(new GetAllSuggestionsAction());
    }),
    catchError(err => of(console.log(err)))
  );


  /**
   * [Effect loginRedirect$]
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
   * [Effect loginFailureRedirect$]
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
   * [Effect description]
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
   * [Effect logoutConfirmed$ removes the access_token from session storage]
   */
  @Effect({ dispatch: false })
  logoutConfirmed$ = this.actions$.pipe(
    ofType<LogoutConfirmedAction>(AuthActionTypes.LogoutConfirmed),
    tap( () => {
      this.authService.logout();
      this.store.dispatch(new ResetUserStateAction());
      this.store.dispatch(new ResetTasksStateAction());
      this.store.dispatch(new ResetSuggestionsStateAction());
      this.store.dispatch(new ResetBootstrapStateAction());
      this.router.navigate([this.authService.logoutUrl]);
    })
  );

  /**
   * [Effect logoutConfirmed$ removes the access_token from session storage]
   */
  @Effect({ dispatch: false })
  logoutConfirmedFromOtherWindow$ = this.actions$.pipe(
    ofType<LogoutConfirmedFromOtherWindowAction>(AuthActionTypes.LogoutConfirmedFromOtherWindow),
    tap( () => {
      // this.authService.logout();
      this.store.dispatch(new SyncToStorageAction({ syncToStorage: false }));
      this.store.dispatch(new ResetUserStateAction());
      this.store.dispatch(new ResetTasksStateAction());
      this.store.dispatch(new ResetSuggestionsStateAction());
      this.store.dispatch(new ResetBootstrapStateAction());
      this.router.navigate([this.authService.logoutUrl]);
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
