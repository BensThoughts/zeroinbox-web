import { User } from './user.models';
import { UserActions, UserActionTypes } from './user.actions';

export interface UserState {
    id: string,
    imageUrl: string,
    name: string,
    familyName: string,
    givenName: string,
    email: string
}

export const initialState: UserState = {
  id: undefined,
  imageUrl: undefined,
  name: undefined,
  familyName: undefined,
  givenName: undefined,
  email: undefined
};

export function userReducer(state: UserState = initialState, action: UserActions): UserState {
  switch (action.type) {

    /*
     * Stores the login information, a GoogleUser as in User interface and sets
     * the isLoggedIn flag to true
     */
    case UserActionTypes.LoadNewUser:
      return {
        ...state,
        id: action.payload.getId(),
        imageUrl: action.payload.getImageUrl(),
        name: action.payload.getName(),
        familyName: action.payload.getFamilyName(),
        givenName: action.payload.getGivenName(),
        email: action.payload.getEmail()
      }

    case UserActionTypes.ResetUser:
      return initialState;

    default:
      return state;
  }
}
