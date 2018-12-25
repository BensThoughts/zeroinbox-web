import { Action } from '@ngrx/store';
import { AuthActions, AuthActionTypes } from '@app/auth/actions/auth.actions';

export interface State {
  isLoggedIn: boolean;
}

export const initialState: State = {
  isLoggedIn: false
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess:
      return {...state, isLoggedIn: true };

    case AuthActionTypes.LogoutConfirmed:
      return initialState;

    default:
      return state;
  }
}

export const selectIsLoggedIn = (state: State) => state.isLoggedIn;
