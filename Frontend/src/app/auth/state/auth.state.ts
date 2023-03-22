import { User } from "../service/user.modal";



export interface AuthState {
  isLoggedIn: boolean;
  error: any;
  user: User|null;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  error: null,
  user: null,
};
