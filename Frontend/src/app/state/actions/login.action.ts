import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/interface/interfaces';

export const login = createAction(
  '[Login Page] Login',
  props<{ email: string, password: string }>()
);

export const loginSuccess = createAction(
  '[Login Page] Login Success',
  props<{ user: User }>()
);
