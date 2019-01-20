
// import { selectSettingsState } from '../core.state';

import { SettingsState, State } from './settings.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '@app/core';

export const selectSettingsState = createFeatureSelector<State, SettingsState>(
  'settings'
);

export const selectSettings = createSelector(
  selectSettingsState,
  (state: SettingsState) => state
);

export const selectTheme = createSelector(
  selectSettings,
  (state: SettingsState) => state.theme.toLowerCase()
);
