import { Router } from '@angular/router';
import { AuthUserService } from '@app/core/services/auth-user/auth-user.service';
import {
  AuthActionTypes,
  LoginRequestedAction,
  LoginCompleteAction,
  LogoutAction,
  LoginSuccessAction,
  LoginFailureAction,
  LogoutConfirmedAction,
  LogoutCancelledAction
} from './auth.actions';
import { Injectable, NgZone } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { tap, map, exhaustMap, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { of } from 'rxjs';
import { LogoutPromptComponent } from '@app/auth/components/logout-prompt/logout-prompt.component';
import { LocalStorageService } from '@app/core/services/local-storage/local-storage.service';
import { Store } from '@ngrx/store';
import { AppState } from '../core.state';
import { LoadNewUserAction, ResetUserAction } from '../user/user.actions';

export const AUTH_KEY = 'AUTH';

@Injectable()
export class AuthEffects {


  /**
   * [Effect login$ activates the signIn() flow from the authService]
   */
  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType<LoginRequestedAction>(AuthActionTypes.LoginRequested),
    tap(() => {
      this.authService.signIn()
    })
  );


  /**
   * [Effect loginComplete$ calls signInSuccessHandler, which stores the
   * access_token in session storage]
   */
  @Effect()
  loginComplete$ = this.actions$.pipe(
    ofType<LoginCompleteAction>(AuthActionTypes.LoginComplete),
    exhaustMap(() => {
      return this.authService.gapiAuthService$.pipe(
        tap((authResult) => {
          if (authResult.isSignedIn) {
            let user = authResult.currentUser.get();
            let basicUserProfile = user.getBasicProfile();
            this.store.dispatch(new LoadNewUserAction(basicUserProfile))
          }
        }),
        map((authResult) => {
          if (authResult.isSignedIn) {
            let authResponse = authResult.currentUser.get().getAuthResponse();
            this.authService.signInSuccessHandler(authResponse);
            this.localStorageService.setItem(AUTH_KEY, {
              isAuthenticated: true,
              accessToken: authResponse.access_token,
              expiresAt: authResponse.expires_at,
              //user: user
            });
            return new LoginSuccessAction({
              //user: user,
              authInfo: authResponse
            });
          }
        }),

        catchError(error => of(new LoginFailureAction(error)))
      );
    })
  );


  /**
   * [Effect loginRedirect$]
   */
  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType<LoginSuccessAction>(AuthActionTypes.LoginSuccess),
    tap(() => {
      this.ngZone.run(() => {
        this.router.navigate([this.authService.authSuccessUrl])
      })
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
      })
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
      this.authService.signOut();
      this.localStorageService.removeItem(AUTH_KEY);
      this.store.dispatch(new ResetUserAction());
      this.router.navigate([this.authService.logoutUrl]);
    })
  );

constructor(
  private actions$: Actions,
  private authService: AuthUserService,
  private router: Router,
  private dialogService: MatDialog,
  private ngZone: NgZone,
  private localStorageService: LocalStorageService,
  private store: Store<AppState>
) {}
}
