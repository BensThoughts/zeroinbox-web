//import { User } from './user.models';
import { AuthActions, AuthActionTypes } from './auth.actions';

export interface AuthState {
  isAuthenticated: boolean,
  accessToken: string,
  expiresAt: number,
  //user: User
}

export const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: undefined,
  expiresAt: undefined,
  //user: undefined
};


export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
  switch (action.type) {

    /*
     * Stores the login information, a GoogleUser as in User interface and sets
     * the isLoggedIn flag to true
     */
    case AuthActionTypes.LoginSuccess:
      return {
        ...state,
        isAuthenticated: true,
        accessToken: action.payload.authInfo.access_token,
        expiresAt: action.payload.authInfo.expires_at,
        //user: action.payload.user
      }

    case AuthActionTypes.LogoutConfirmed:
      return initialState;

    default:
      return state;
  }
}
