import {
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector
} from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '@env/environment';

import { authReducer, AuthState } from './auth/auth.reducer';
import { RouterStateUrl } from './router/router.state';

import { userReducer, UserState } from './user/user.reducer';
import { sendersReducer, SendersState } from './senders/senders.reducer';

import { debug } from './meta-reducers/debug.reducer';
import { localStorageSyncReducer } from './meta-reducers/local-storage-sync.reducer';
import { BootstrapState, bootstrapReducer } from './bootstrap/bootstrap.reducer';
import { settingsReducer, SettingsState } from './settings/settings.reducer';

export const reducers: ActionReducerMap<AppState> = {
  settings: settingsReducer,
  router: routerReducer,
  auth: authReducer,
  user: userReducer,
  bootstrap: bootstrapReducer,
  senders: sendersReducer
};

export const metaReducers: MetaReducer<AppState>[] = [
  localStorageSyncReducer,
  // debug
];
if (!environment.production) {
  metaReducers.unshift(storeFreeze);
  if (!environment.test) {
    // metaReducers.unshift(debug);
  }
}

export const selectAuthState = createFeatureSelector<AppState, AuthState>(
  'auth'
);

export const selectUserState = createFeatureSelector<AppState, UserState>(
  'user'
);

export const selectBootstrapState = createFeatureSelector<AppState, BootstrapState>(
  'bootstrap'
);

export const selectSendersState = createFeatureSelector<AppState, SendersState>(
  'senders'
)

export const selectSettingsState = createFeatureSelector<AppState, SettingsState>(
  'settings'
)


export const selectRouterState = createFeatureSelector<
  AppState,
  RouterReducerState<RouterStateUrl>
>('router');



export interface AppState {
  settings: SettingsState;
  router: RouterReducerState<RouterStateUrl>;
  user: UserState;
  auth: AuthState;
  bootstrap: BootstrapState;
  senders: SendersState;
}
