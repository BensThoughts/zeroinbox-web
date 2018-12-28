import { Action } from '@ngrx/store';
import BasicProfile = gapi.auth2.BasicProfile;

export enum UserActionTypes {
  LoadNewUser = '[Auth Effects] Load New User',
  ResetUser = '[Auth Effects] Reset User'
}

export class LoadNewUserAction implements Action {
  readonly type = UserActionTypes.LoadNewUser;

  constructor(public payload: BasicProfile) {}
}

export class ResetUserAction implements Action {
  readonly type = UserActionTypes.ResetUser;
}

export type UserActions =
  | LoadNewUserAction
  | ResetUserAction;
