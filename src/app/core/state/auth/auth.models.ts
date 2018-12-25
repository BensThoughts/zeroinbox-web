import { User } from './user.models';

export interface AuthState {
  isAuthenticated: boolean,
  user: User
}
