import { Login } from './../../shared/interface/interfaces';
import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess } from '../actions/auth.actions';

export interface AuthState {
  isLoggedIn: boolean;
  error: any;
  user: Login | null;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  error: null,
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state) => {
    return {
      ...state,
      isLoggedIn: false,
    };
  }),
  on(loginSuccess, (state) => {
    return {
      ...state,
      isLoggedIn: true,
      error: null,
    };
  }),
  // on(loginFailure, (state, {error}) => {
  //   return {
  //     ...state,
  //     isLoggedIn: false,
  //     error,
  //   };
  // }),
  // on(AuthActions.logout, (state) => {
  //   return {
  //     ...state,
  //     isLoggedIn: false,
  //   };
  // })
);
