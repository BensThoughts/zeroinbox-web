import { Action } from '@ngrx/store';
// import BasicProfile = gapi.auth2.BasicProfile;
import { BasicProfile, EmailProfile } from './user.model';

export enum UserActionTypes {
  LoadBasicProfile = '[Auth-User Service] Load BasicProfile',
  LoadEmailProfile = '[Auth-User Service] Load Email Profile',
  ResetUser = '[Auth Effects] Reset User'
}

export class LoadBasicProfileAction implements Action {
  readonly type = UserActionTypes.LoadBasicProfile;

  constructor(public payload: BasicProfile) {}
}

export class LoadEmailProfileAction implements Action {
  readonly type = UserActionTypes.LoadEmailProfile;

  constructor(public payload: EmailProfile) {}
}

export class ResetUserAction implements Action {
  readonly type = UserActionTypes.ResetUser;
}

export type UserActions =
  | LoadBasicProfileAction
  | LoadEmailProfileAction
  | ResetUserAction;
