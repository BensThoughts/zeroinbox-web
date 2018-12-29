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

import { debug } from './meta-reducers/debug.reducer';
import { localStorageSyncReducer } from './meta-reducers/local-storage-sync.reducer';

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  user: userReducer,
  router: routerReducer
};

export const metaReducers: MetaReducer<AppState>[] = [
  localStorageSyncReducer
];
if (!environment.production) {
  metaReducers.unshift(storeFreeze);
  if (!environment.test) {
    metaReducers.unshift(debug);
  }
}

export const selectAuthState = createFeatureSelector<AppState, AuthState>(
  'auth'
);

export const selectUserState = createFeatureSelector<AppState, UserState>(
  'user'
);

export const selectRouterState = createFeatureSelector<
  AppState,
  RouterReducerState<RouterStateUrl>
>('router');

export interface AppState {
  user: UserState;
  auth: AuthState;
  router: RouterReducerState<RouterStateUrl>;
}
