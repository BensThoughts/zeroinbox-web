import { Action } from '@ngrx/store';
import {User} from './user.models';

export enum AuthActionTypes {
  LoginAction = '[Login Page] Login Action',
  LogoutAction = '[Sidenav Logout] Logout Action',
}

export class AuthLoginAction implements Action {
  readonly type = AuthActionTypes.LoginAction;
  constructor(public payload: {user: User}) {
  }
}


export class AuthLogoutAction implements Action {
  readonly type = AuthActionTypes.LogoutAction;
}

export type AuthActions = AuthLoginAction | AuthLogoutAction;
