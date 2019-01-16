import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectUserState } from '../core.state';
import { UserState } from './user.reducer';

export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state
);

export const selectEmailProfile = createSelector(
  selectUser,
  (state: UserState) => state.email_profile
)

export const selectBasicProfile = createSelector(
  selectUser,
  (state: UserState) => state.basic_profile
)
