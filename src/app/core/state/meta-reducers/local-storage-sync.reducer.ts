import { localStorageSync } from 'ngrx-store-localstorage';
import { ActionReducer } from '@ngrx/store';
import { AppState } from '../core.state';

export function localStorageSyncReducer(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return localStorageSync({keys: ['user', 'auth', 'gmail-labels']})(reducer);
}
