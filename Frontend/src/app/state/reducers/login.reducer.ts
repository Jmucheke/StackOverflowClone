import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess } from '../actions/login.action';
import { User } from '../../shared/interface/interfaces'

export interface LoginState {
  loggedIn: boolean;
  user: User | null;
}

const initialState: LoginState = {
  loggedIn: false,
  user: null
};

export const loginReducer = createReducer(
  initialState,
  on(login, (state) => ({ ...state })),
  on(loginSuccess, (state, { user }) => ({ ...state, loggedIn: true, user }))
);
