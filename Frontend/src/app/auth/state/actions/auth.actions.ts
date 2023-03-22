import { createAction, props } from '@ngrx/store';
import { User } from '../../service/user.modal';

// Login actions
export const LOGIN = '[Auth]  login start';
export const LOGIN_SUCCESS = '[Auth]  login success';
export const LOGIN_FAIL = '[Auth]  login fail';
export const AUTO_LOGIN = '[Auth page] auto login';
export const LOGOUT_ACTION = '[auth page] logout'

// Sign up actions
export const SIGNUP = '[auth page] signup start'
export const SIGNUP_SUCCESS = '[auth page] signup success'


export const login = createAction(
  LOGIN,
  props<{email:string; password:string}>()
)

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{user:User, redirect:boolean}>()
  )
export const loginFail = createAction(
  LOGIN_FAIL, 
  props<{error: any}>
  )

export const autoLogin = createAction(AUTO_LOGIN)

export const logout = createAction(LOGOUT_ACTION)

export const signup = createAction(
  SIGNUP,
  props<{name:string, email:string, password:string}>()
);

export const signupSuccess = createAction(
  SIGNUP_SUCCESS,
  props<{user:User}>()
)


