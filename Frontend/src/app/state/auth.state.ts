import { Login } from "../shared/interface/interfaces";


export interface AuthState {
  isLoggedIn: boolean;
  error: any;
  user: Login|null;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  error: null,
  user: null,
};