import { Action } from '@ngrx/store';

export enum SettingsActionTypes {
  ChangeTheme = '[Settings] Change Theme',
  UpdateSettingsState = '[Settings Effects] Update Settings State',
}

export class SettingsChangeThemeAction implements Action {
  readonly type = SettingsActionTypes.ChangeTheme;

  constructor(public payload: { theme: string }) {}
}

export class UpdateSettingsStateAction implements Action {
  readonly type = SettingsActionTypes.UpdateSettingsState;

  constructor(public payload: any) {}
}


export type SettingsActions =
  | SettingsChangeThemeAction
  
  | UpdateSettingsStateAction
