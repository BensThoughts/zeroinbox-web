import { SettingsActions, SettingsActionTypes } from './settings.actions';
import { AppState } from '@app/core';

export interface State extends AppState {
  settings: SettingsState;
}

export interface SettingsState {
  theme: string;
}

export const initialState: SettingsState = {
  theme: 'DEFAULT_THEME',
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
