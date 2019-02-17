import { localStorageSync } from 'ngrx-store-localstorage';
import { ActionReducer, Action } from '@ngrx/store';
import { AppState } from '../core.state';

export function localStorageSyncReducer(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return localStorageSync(
    {
      keys: ['user', 'auth', 'bootstrap', 'settings', 'tasks', 'suggestions'],
      // keys: ['auth', 'settings'],
      rehydrate: true,
      removeOnUndefined: true,
      storageKeySerializer: (key) => 'go-app-' + key,
      syncCondition: (state: AppState) => {
        return true;
        // return state.bootstrap.syncToStorage
      } 
    }
  )(reducer);
}
