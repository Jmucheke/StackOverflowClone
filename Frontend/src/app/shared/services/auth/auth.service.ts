import { Login, authResponseData } from './../../interface/interfaces';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from './user.modal';
import { login } from 'src/app/auth/state/actions/auth.actions';
import { AppState } from '../../store/app.state';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient, private store: Store<AppState>) { }

  login(email: string, password: string): Observable<authResponseData> {
    return this.http.post<authResponseData>('http://localhost:4000/users/login', { email, password })
      .pipe(tap((response) => {
        localStorage.setItem('token', response.token)
        this.store.dispatch(login({ email, password }))
        console.log(response.name);



      })

      );
  }

  formatUser(data: authResponseData) {
    const user = new User(data.name, data.email, data.token,)
    return user;
  }

  // logout(): void {
  //   localStorage.removeItem('token');
  //   this.store.dispatch(logout())
  // }

  getToken(): string | null {
    return localStorage.getItem('token');


  }

  // isAuthenticated(): boolean {
  //   const token = this.getToken
  //   return !!this.getToken();
  // }

  // getUser(): Observable<User> {
  //   return this.http.get<User>('http://localhost:4000/auth/register');
  // }





}
