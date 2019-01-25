import { Action } from '@ngrx/store';

export enum SettingsActionTypes {
  ChangeTheme = '[Settings] Change Theme',
}

export class SettingsChangeThemeAction implements Action {
  readonly type = SettingsActionTypes.ChangeTheme;

  constructor(public payload: { theme: string }) {}
}


export type SettingsActions =
  | SettingsChangeThemeAction
