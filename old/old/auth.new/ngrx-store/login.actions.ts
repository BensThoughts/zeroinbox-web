import { Action } from '@ngrx/store';

export enum ActionTypes {
  LOGIN_INITIATED = '[Login Page] Login Attempt Initiated',
  LOGIN_SUCCESS = '[Login Page] Login Success',
  LOGIN_FAILED = '[Login Page] Login Failed'
}

export class LoginInitiated implements Action {
  readonly type = ActionTypes.LOGIN_INITIATED;
}

export class LoginSuccess implements Action {
  readonly type = ActionTypes.LOGIN_SUCCESS;
}

export class LoginFailed implements Action {
  readonly type = ActionTypes.LOGIN_FAILED;
}

export type LoginActionsUnion =
  LoginInitiated |
  LoginSuccess |
  LoginFailed;
