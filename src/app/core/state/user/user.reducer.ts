// import { User } from './user.models';
import { UserActions, UserActionTypes } from './user.actions';
import { BasicProfile, EmailProfile } from './user.model';

export interface UserState {
  basic_profile: BasicProfile;
  email_profile: EmailProfile;
  basic_profile_loaded: boolean;
  email_profile_loaded: boolean;
}

export const initialState: UserState = {
  basic_profile: undefined,
  email_profile: undefined,
  basic_profile_loaded: false,
  email_profile_loaded: false
};

export function userReducer(state: UserState = initialState, action: UserActions): UserState {
  switch (action.type) {

    /*
     * Stores the login information, a GoogleUser as in User interface and sets
     * the isLoggedIn flag to true
     */
    case UserActionTypes.LoadBasicProfile:
      return {
        ...state,
        basic_profile: action.payload,
        basic_profile_loaded: true
      };

    case UserActionTypes.LoadEmailProfile:
      console.log(action.payload);
      return {
        ...state,
        email_profile: action.payload,
        email_profile_loaded: true
      }

    case UserActionTypes.ResetUserState:
      return initialState;

    case UserActionTypes.UpdateUserState:
      return action.payload;

    default:
      return state;
  }
}
