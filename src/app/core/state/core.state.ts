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
import { tasksReducer, TasksState } from './tasks/tasks.reducer';

import { debug } from './meta-reducers/debug.reducer';
import { localStorageSyncReducer } from './meta-reducers/local-storage-sync.reducer';
import { gmailLabelReducer, GmailLabelState } from './gmail-api/gmail-label/gmail-label.reducer';
import { SendersState, sendersReducer } from './gmail-api/senders/senders.reducer';

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  auth: authReducer,
  user: userReducer,
  gmailLabel: gmailLabelReducer,
  senders: sendersReducer,
  tasks: tasksReducer
};

export const metaReducers: MetaReducer<AppState>[] = [
  localStorageSyncReducer
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

export const selectGmailLabelState = createFeatureSelector<AppState, GmailLabelState>(
  'gmailLabel'
);

export const selectSendersState = createFeatureSelector<AppState, SendersState>(
  'senders'
);

export const selectTasksState = createFeatureSelector<AppState, TasksState>(
  'tasks'
);

export const selectRouterState = createFeatureSelector<
  AppState,
  RouterReducerState<RouterStateUrl>
>('router');



export interface AppState {
  router: RouterReducerState<RouterStateUrl>;
  user: UserState;
  auth: AuthState;
  gmailLabel: GmailLabelState;
  senders: SendersState;
  tasks: TasksState;
}
