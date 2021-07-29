import { Action } from '@ngrx/store';

export enum LocalStorageActionTypes {
  ResetStorage = '[Local Storage Effects] Reset Storage'
}

export class ResetLocalStorageAction implements Action {
  readonly type = LocalStorageActionTypes.ResetStorage;
}

export type LocalStorageActions = ResetLocalStorageAction;
