// import { User } from './user.models';
import { UserActions, UserActionTypes } from './user.actions';
import { BasicProfile, EmailProfile } from './user.model';

export interface UserState {
  basic_profile: BasicProfile;
  email_profile: EmailProfile;
}

export const initialState: UserState = {
  basic_profile: undefined,
  email_profile: undefined
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
        basic_profile: action.payload
      };

    case UserActionTypes.LoadEmailProfile:
      console.log(action.payload);
      return {
        ...state,
        email_profile: action.payload
      }

    case UserActionTypes.ResetUser:
      return initialState;

    default:
      return state;
  }
}
