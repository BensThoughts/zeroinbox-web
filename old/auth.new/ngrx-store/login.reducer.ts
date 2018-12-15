import { ActionTypes, LoginActionsUnion } from './login.actions';
import { LoginState } from './login.model';
import { createSelector } from '@ngrx/store';
//  ActionTypes : LOGIN_INITIATED, LoginActionsUnion : LoginInitiated
// ActionTypes: LOGIN_SUCCESS, LoginActionsUnion: LoginSuccess
// ActionTypes: LOGIN_FAILED, LoginActionsUnion: LoginFailed

// LoginState is the interface definition used to store the LoginState in
// the @ngrx Store


/*
export interface AppState {
  loginFeatureState: LoginState;
}

export const selectFeature = (state: AppState) => state.loginFeatureState;
export const selectFeatureLoginState = createSelector(
  selectFeature,
  (state: LoginState) => state.isAuthenticated
);
*/
// The initial state of LoginState for the @ngrx Store
export const initialState: LoginState = {
  loginInitiated: false,
  loginSuccess: false,
  loginFailed: false,
  isAuthenticated: false
};

// The reducer function decides what to do to the LoginState currently stored
// in the @ngrx store, how to update (or initialize) the LoginState in the
// @ngrx store.
export function authReducer(
  state = initialState, // the initial state
  action: LoginActionsUnion // the Action Observed
): LoginState {
    switch (action.type) {
      case ActionTypes.LOGIN_INITIATED:
        return {
          ...state,
          loginInitiated: true,
        };

      case ActionTypes.LOGIN_SUCCESS:
        return {
          ...state,
          loginSuccess: true,
          isAuthenticated: true
        };

      case ActionTypes.LOGIN_FAILED:
        return {
          ...state,
          loginFailed: true,
          isAuthenticated: false
        };

      default:
        return state;
  }
}
