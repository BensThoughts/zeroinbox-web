import { Action } from '@ngrx/store';
import { BasicProfile, EmailProfile } from './user.model';

export enum UserActionTypes {
  LoadBasicProfile = '[Auth-User Service] Load BasicProfile',
  LoadEmailProfile = '[Auth-User Service] Load Email Profile',
  ResetUserState = '[Auth Effects] Reset User',
  UpdateUserState = '[User Effects] Update User State From Another Tab/Window'
}

export class LoadBasicProfileAction implements Action {
  readonly type = UserActionTypes.LoadBasicProfile;

  constructor(public payload: BasicProfile) {}
}

export class LoadEmailProfileAction implements Action {
  readonly type = UserActionTypes.LoadEmailProfile;

  constructor(public payload: EmailProfile) {}
}

export class ResetUserStateAction implements Action {
  readonly type = UserActionTypes.ResetUserState;
}

export class UpdateUserStateAction implements Action {
  readonly type = UserActionTypes.UpdateUserState
  constructor(public payload: any){}
}

export type UserActions =
  | LoadBasicProfileAction
  | LoadEmailProfileAction
  | ResetUserStateAction
  | UpdateUserStateAction;
