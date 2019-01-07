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
  gapi_token: GapiToken;
  id_token: string;
  login_hint: string;
  // accessToken: string;
  // expiresAt: number;
  // scope: string;
  // user: User
}

export const initialState: AuthState = {
  isAuthenticated: false,
  gapi_token: undefined,
  id_token: undefined,
  login_hint: undefined
  // accessToken: undefined,
  // expiresAt: undefined,
  // scope: undefined
  // user: undefined
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
        gapi_token: {
          access_token: action.payload.authInfo.access_token,
          expiry_date: action.payload.authInfo.expires_at,
          scope: action.payload.authInfo.scope,
          token_type: 'Bearer'
        },
        id_token: action.payload.authInfo.id_token,
        login_hint: action.payload.authInfo.login_hint
        // user: action.payload.user
      };

    case AuthActionTypes.LogoutConfirmed:
      return initialState;

    default:
      return state;
  }
}
