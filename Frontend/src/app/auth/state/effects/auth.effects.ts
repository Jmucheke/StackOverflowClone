import { loginFail } from './../actions/auth.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { login, loginSuccess } from '../actions/auth.actions';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { AppState } from 'src/app/shared/store/app.state';
import { setLoadingSpinner } from 'src/app/shared/store/state/actions/shared.action';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private store: Store<AppState>) { }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            console.log(data)
            this.store.dispatch(setLoadingSpinner({ status: false }))
            const user = this.authService.formatUser(data)
            return loginSuccess({ user })
          })
          // catchError((error) => of(loginFail({ error })))
        )
      })
    )
  });


}
