import { Action } from '@ngrx/store';

export enum SettingsActionTypes {
  ChangeTheme = '[Settings] Change Theme',
  ChangeCountCutoff = '[Settings] Change Count Cutoff'
}

export class SettingsChangeThemeAction implements Action {
  readonly type = SettingsActionTypes.ChangeTheme;

  constructor(public payload: { theme: string }) {}
}

export class SettingsChangeCountCutoffAction implements Action {
  readonly type = SettingsActionTypes.ChangeCountCutoff;

  constructor(public payload: { countCutoff: number }) {}
}

export type SettingsActions =
  | SettingsChangeThemeAction
  | SettingsChangeCountCutoffAction
