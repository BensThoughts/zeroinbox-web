// import { User } from './user.models';
import { AuthActions, AuthActionTypes } from './auth.actions';

export interface GapiToken {
  access_token: string;
  expiry_date: number;
  scope: string;
  token_type: string;
}

export interface AuthState {
  isAuthenticated: boolean;
}

export const initialState: AuthState = {
  isAuthenticated: false,
};


export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
  switch (action.type) {

    /*
     * Stores the auth information and sets the isLoggedIn flag to true
     */
    case AuthActionTypes.LoginSuccess:
      return {
        ...state,
        isAuthenticated: true,
      };

    case AuthActionTypes.LoginComplete:
      return {
        ...state,
        isAuthenticated: true,
      }

    case AuthActionTypes.LogoutConfirmed:
      return initialState;

    case AuthActionTypes.LogoutConfirmedFromOtherWindow:
      return initialState;

    case AuthActionTypes.UpdateAuthState:
      return action.payload;

    default:
      return state;
  }
}
