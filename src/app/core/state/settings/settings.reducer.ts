import { SettingsActions, SettingsActionTypes } from './settings.actions';
import { AppState } from '@app/core';
import { Category } from './category.model';

export interface State extends AppState {
  settings: SettingsState;
}

export interface SettingsState {
  theme: string;
  categories: Category[];
}

export const initialState: SettingsState = {
  theme: 'BLACK-THEME',
  categories: [
    { name: 'Friends', value: 'Friends' },
    { name: 'Shopping', value: 'Shopping' },
    { name: 'News', value: 'News' },
    { name: 'Work', value: 'Work' },
    { name: 'Finance', value: 'Finance' },
    { name: 'Travel', value: 'Travel' },
    { name: 'Misc', value: 'Misc' }
  ]
};

export function settingsReducer(
  state: SettingsState = initialState,
  action: SettingsActions
): SettingsState {
  switch (action.type) {
    case SettingsActionTypes.ChangeTheme:
      return { ...state, ...action.payload };

    case SettingsActionTypes.SetCategories:
      return {
        ...state,
        categories: action.payload.categories
      };

    case SettingsActionTypes.AddCategory:
      return {
        ...state,
        categories: [...state.categories.concat(action.payload.category)]
      };

    case SettingsActionTypes.RemoveCategory:
      let index = state.categories.indexOf(action.payload.category);
      return {
        ...state,
        categories: [
          ...state.categories.slice(0, index),
          ...state.categories.slice(index + 1)
        ]
      };

    case SettingsActionTypes.UpdateSettingsState:
      return action.payload;

    default:
      return state;
  }
}
