import { createAction, props } from '@ngrx/store';


export const LOGIN = '[Auth]  login start';
export const LOGIN_SUCCESS = '[Auth]  login success';
export const LOGIN_FAIL = '[Auth]  login fail';

export const login = createAction(
  LOGIN,
  props<{email:string; password:string}>()
)

export const loginSuccess = createAction(LOGIN_SUCCESS)
export const loginFail = createAction(LOGIN_FAIL)


export const logout = createAction('[Auth] Logout');
