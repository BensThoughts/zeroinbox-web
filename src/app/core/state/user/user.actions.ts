import { Action } from '@ngrx/store';
// import BasicProfile = gapi.auth2.BasicProfile;
import { BasicProfile, EmailProfile } from './user.model';

export enum UserActionTypes {
  LoadBasicProfile = '[Auth-User Service] Load BasicProfile',
  LoadEmailProfile = '[Auth-User Service] Load Email Profile',
  ResetUserState = '[Auth Effects] Reset User',
  UpdateUserState = '[User Effects] UPDATE_USER_STATE'
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
  readonly type = UserActionTypes.ResetUserState;
}

export class UpdateUserStateAction implements Action {
  readonly type = UserActionTypes.UpdateUserState
  constructor(public payload: any){}
}

export type UserActions =
  | LoadBasicProfileAction
  | LoadEmailProfileAction
  | ResetUserAction
  | UpdateUserStateAction;
