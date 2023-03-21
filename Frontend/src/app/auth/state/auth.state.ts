import { User } from "src/app/shared/services/auth/user.modal";



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
