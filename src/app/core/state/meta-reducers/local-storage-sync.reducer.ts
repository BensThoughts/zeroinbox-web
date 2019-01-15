import { localStorageSync } from 'ngrx-store-localstorage';
import { ActionReducer, Action } from '@ngrx/store';
import { AppState } from '../core.state';

export function localStorageSyncReducer(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return localStorageSync(
    {
      keys: ['user', 'auth', 'gmailLabel', 'suggested'],
      rehydrate: true,
      removeOnUndefined: true,
      storageKeySerializer: (key) => 'go-app-' + key
    }
  )(reducer);
}

/**
export function updateStateReducer(reducer: ActionReducer<AppState>) {
  return (state: AppState | undefined, action: Action) => {
    if (action.type === 'UPDATE_AUTH_STATE') {
      // replace the current state with the new state
      return action.payload.newState;
    }
    return reducer(state, action);
  };
}
**/
