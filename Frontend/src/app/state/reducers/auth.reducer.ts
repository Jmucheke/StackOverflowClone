import { Login } from './../../shared/interface/interfaces';
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';

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
  on(AuthActions.login, (state) => {
    return {
      ...state,
      isLoggedIn: false,
    };
  }),
  on(AuthActions.loginSuccess, (state, {user}) => {
    return {
      ...state,
      isLoggedIn: true,
      error: null,
      user,
    };
  }),
  on(AuthActions.loginFailure, (state, {error}) => {
    return {
      ...state,
      isLoggedIn: false,
      error,
    };
  }),
  on(AuthActions.logout, (state) => {
    return {
      ...state,
      isLoggedIn: false,
    };
  })
);
