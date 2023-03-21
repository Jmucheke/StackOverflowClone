import { loginFail } from './../actions/auth.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AuthService } from '../../shared/services/auth/auth.service';
import { login, loginSuccess } from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) { }
  
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      exhaustMap((action) =>{
        return this.authService.login(action.email, action.password).pipe(
          map((user) => {
            return loginSuccess()
          })
          // catchError((error) => of(loginFail({ error })))
        )
  })
    )
        });

  
}
