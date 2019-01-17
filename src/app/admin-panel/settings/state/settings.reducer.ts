import { SettingsActions, SettingsActionTypes } from './settings.actions';
import { AppState } from '@app/core';

export interface State extends AppState {
  settings: SettingsState;
}

export interface SettingsState {
  theme: string;
  countCutoff: number;
}

export const initialState: SettingsState = {
  theme: 'DEFAULT_THEME',
  countCutoff: 10
}

export function settingsReducer(state: SettingsState = initialState, action: SettingsActions): SettingsState {
  switch (action.type) {
    case SettingsActionTypes.ChangeTheme:
      return { ...state, ...action.payload }

    case SettingsActionTypes.ChangeCountCutoff:
      return { ...state, ...action.payload }

    default:
      return state;
  }

}
