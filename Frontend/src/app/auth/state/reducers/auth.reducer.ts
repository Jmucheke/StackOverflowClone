import { logout, signupSuccess } from './../actions/auth.actions';
import { createReducer, on } from '@ngrx/store';
import { login, loginFail, loginSuccess } from '../actions/auth.actions';
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
  on(signupSuccess, (state, action) => {
    console.log(action);

    return {
      ...state
    };
  }),
  on(logout, (state)=>{
    return{
      ...state,
      
    }
  })
  
  );
