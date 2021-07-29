import { SettingsState, State } from './settings.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectSettingsState } from '@app/core/state/core.state';

export const selectSettings = createSelector(
  selectSettingsState,
  (state: SettingsState) => state
);

export const selectTheme = createSelector(
  selectSettings,
  (state: SettingsState) => state.theme.toLowerCase()
);

export const selectCategories = createSelector(
  selectSettings,
  (state: SettingsState) => state.categories
);
