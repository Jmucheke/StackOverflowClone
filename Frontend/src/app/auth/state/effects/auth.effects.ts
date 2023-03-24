import { setErrorMessage } from './../../../shared/store/state/actions/shared.action';
import { autoLogin, loginFail, logout, signup, signupSuccess } from './../actions/auth.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { login, loginSuccess } from '../actions/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app.state';
import { setLoadingSpinner } from 'src/app/shared/store/state/actions/shared.action';
import { Router } from '@angular/router';
import { User } from '../../service/user.modal'
import { AuthService } from '../../service/auth.service';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private store: Store<AppState>, private router: Router) { }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            // console.log(data)
            this.store.dispatch(setLoadingSpinner({ status: false }))
            this.store.dispatch(setErrorMessage({ message: '' }))
            const user = this.authService.formatUser(data)
            this.authService.setUserInLocalStorage(user);
            return loginSuccess({ user, redirect: true })
          }),
          catchError((errResp) => {
            // console.log(errResp.error);
            this.store.dispatch(setLoadingSpinner({ status: false }))
            const errorMessage = this.authService.getErrorMessage(errResp.error)
            return of(setErrorMessage({ message: errorMessage }));

          })

        )
      })
    )
  });

  loginRedirect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginSuccess),
      tap((action) => {
        this.store.dispatch(setErrorMessage({ message: '' }))
        if (action.redirect) {
          
        }
      }))
  }, { dispatch: false });


  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signup),
      exhaustMap((action) => {
        return this.authService.signup(action.name, action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }))
            this.store.dispatch(setErrorMessage({ message: '' }))
            const user = this.authService.formatUser(data)
            return signupSuccess({ user })
          }),
          catchError((errResp) => {
            // console.log(errResp.error);
            this.store.dispatch(setLoadingSpinner({ status: false }))
            const errorMessage = this.authService.getErrorMessage(errResp.error)
            return of(setErrorMessage({ message: errorMessage }));

          })
        )
      })
    )
  })

  signupRedirect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupSuccess),
      tap((action) => {
        this.router.navigate(['/login'])
      }))
  }, { dispatch: false });


  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap((action) => {
        const user = this.authService.getUserFromLocalStorage();
        if (user) {
          return of(loginSuccess({ user, redirect: false }));
        }
        else {
          return of(loginFail())

        }

      })
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logout),
      map((action) => {
        this.authService.logout()
        this.router.navigate(['/login'])
      })
    )
  },
    { dispatch: false }
  )


}
