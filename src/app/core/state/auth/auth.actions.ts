import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LoginRequested = '[Login Page] Login Requested',
  LoginComplete = '[Loading Page] Login Complete',
  LoginSuccess = '[Auth Effects] Login Success',
  LoginFailure = '[Auth Effects] Login Failure',
  Logout = '[Sidenav Auth] Confirm Logout?',
  LogoutCancelled = '[Auth Effects] Logout Cancelled',
  LogoutConfirmed = '[Auth Effects] Logout Confirmed',
  LogoutConfirmedFromOtherWindow = '[Auth Effects] Logout Confirmed From Other Window',
  UpdateAuthState = '[Auth Effects] Update Auth State',
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

export class UpdateAuthStateAction implements Action {
  readonly type = AuthActionTypes.UpdateAuthState;
  constructor(public payload: any) {}
}

export type AuthActions =
  | LoginRequestedAction
  | LoginCompleteAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction
  | LogoutCancelledAction
  | LogoutConfirmedAction
  | LogoutConfirmedFromOtherWindowAction

  | UpdateAuthStateAction