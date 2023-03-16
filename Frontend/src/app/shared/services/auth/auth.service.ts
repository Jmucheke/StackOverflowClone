import { Login } from './../../interface/interfaces';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { login, logout } from 'src/app/state/actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient, private store:Store<AppState>) { }

  login(user:Login): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>('http://localhost:4000/auth/login',user)
      .pipe(tap((response) => {
        localStorage.setItem('token', response.token)
        this.store.dispatch(login(user))
  })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.store.dispatch(logout())
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken
    return !!this.getToken();
  }

  // getUser(): Observable<User> {
  //   return this.http.get<User>('http://localhost:4000/auth/register');
  // }


  


}
