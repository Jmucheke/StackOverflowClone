import { createReducer, on } from '@ngrx/store';
import { login, loginFail, loginSuccess } from '../actions/auth.actions';
import { User } from 'src/app/shared/services/auth/user.modal';
import { initialState } from '../auth.state';

// 

export const authReducer = createReducer(
  initialState,
  on(login, (state) => {
    return {
      ...state,
      isLoggedIn: false,
    };
  }),
  on(loginSuccess, (state, action) => {
    console.log(action);
    
    return {
      ...state,
      isLoggedIn: true,
      user:action.user
    };
  }),
  // on(loginFail, (state, {error}) => {
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
