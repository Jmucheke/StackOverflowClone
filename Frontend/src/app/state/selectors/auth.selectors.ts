import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { AuthService } from '../../shared/services/auth/auth.service'
import { AuthState } from '../auth.state';

export const selectAuthState = (state: AppState) => state.auth;

export const isLoggedIn = createSelector(
  selectAuthState,
  (auth) => auth.isLoggedIn
);

export const selectAuthError = createSelector(
  selectAuthState,
  (auth) => auth.error
);

export const selectUser = createSelector(
  selectAuthState,
  (auth) => auth.user
);
