import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LoginRequested = '[Login Page] Login Requested',
  LoginComplete = '[Loading Page] Login Complete',
  LoginSuccess = '[Auth Effects] Login Success',
  LoginFailure = '[Auth Effects] Login Failure',
  CheckLogin = '[Auth] Check Login',
  Logout = '[Sidenav Auth] Confirm Logout',
  LogoutCancelled = '[Auth Effects] Logout Cancelled',
  LogoutConfirmed = '[Auth Effects] Logout Confirmed',
  LogoutConfirmedFromOtherWindow = '[Auth Effects] Logout Confirmed From Other Window',
  UpdateAuthState = 'UPDATE_AUTH_STATE'
}

export class UpdateAuthState implements Action {
  readonly type = AuthActionTypes.UpdateAuthState;
  constructor(public payload: any) {}
}

export class LoginRequestedAction implements Action {
  readonly type = AuthActionTypes.LoginRequested;
}

export class LoginCompleteAction implements Action {
  readonly type = AuthActionTypes.LoginComplete;
}

export class LoginSuccessAction implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  // constructor(public payload: any) {}
}

export class LoginFailureAction implements Action {
  readonly type = AuthActionTypes.LoginFailure;

  constructor(public payload: any) {}
}

export class CheckLoginAction implements Action {
  readonly type = AuthActionTypes.CheckLogin;
}

export class LogoutAction implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class LogoutConfirmedAction implements Action {
  readonly type = AuthActionTypes.LogoutConfirmed;
}

export class LogoutCancelledAction implements Action {
  readonly type = AuthActionTypes.LogoutCancelled;
}

export class LogoutConfirmedFromOtherWindowAction implements Action {
  readonly type = AuthActionTypes.LogoutConfirmedFromOtherWindow;
}

export type AuthActions =
  | LoginRequestedAction
  | LoginCompleteAction
  | LoginSuccessAction
  | LoginFailureAction
  | CheckLoginAction
  | LogoutAction
  | LogoutCancelledAction
  | LogoutConfirmedAction
  | LogoutConfirmedFromOtherWindowAction
  | UpdateAuthState;
