import { User } from './user.models';
import { AuthActions, AuthActionTypes } from './auth.actions';

export interface AuthState {
  isAuthenticated: boolean,
  user: User
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: undefined
};


export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
  switch (action.type) {

    /*
     * Stores the login information, a GoogleUser as in User interface and sets
     * the isLoggedIn flag to true
     */
    case AuthActionTypes.LoginSuccess:
      return { ...state, isAuthenticated: true, user: action.payload }

    case AuthActionTypes.LogoutConfirmed:
      return initialState;

    default:
      return state;
  }
}
