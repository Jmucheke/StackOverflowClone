import { Login, authResponseData } from '../../shared/interfaces/interfaces';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from './user.modal';
import { login, logout } from 'src/app/auth/state/actions/auth.actions';
import { AppState } from '../../shared/store/app.state';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  timeoutInterval: any;

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  login(email: string, password: string): Observable<authResponseData> {
    return this.http.post<authResponseData>('http://localhost:4000/users/login', { email, password })
      .pipe(tap((response) => {
        localStorage.setItem('token', response.token)
        this.store.dispatch(login({ email, password }))



      })

      );
  }

  signup(name: string, email: string, password: string): Observable<authResponseData> {
    return this.http.post<authResponseData>('http://localhost:4000/users/register', { name, email, password })
  }

  formatUser(data: authResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    )
    const user = new User(data.name, data.email, data.token, expirationDate)
    return user;
  }

  // logout(): void {
  //   localStorage.removeItem('token');
  //   this.store.dispatch(logout())
  // }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'User Not found':
        return 'User Not found';

      default:
        return 'Unknown error occurred. Please try again';
    }
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user))
    this.runTimeoutInterval(user)

  }
  runTimeoutInterval(user: User) {
    const todaysDate = new Date().getTime()
    const expirationDate = user.expireDate.getTime()
    const timeInterval = expirationDate - todaysDate

    this.timeoutInterval = setTimeout(() => {
      this.store.dispatch(logout())

    }, timeInterval)
  }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData')

    if (userDataString) {
      const userData = JSON.parse(userDataString)
      const expirationDate = new Date(userData.expirationDate)
      const user = new User(userData.name, userData.email, userData.token, expirationDate)
      this.runTimeoutInterval(user)
      return user;

    }

    return null
  }

  logout() {
    localStorage.removeItem('userData');
    localStorage.clear()
    if (this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);

      this.timeoutInterval = null;
    }
  }

  // isAuthenticated(): boolean {
  //   const token = this.getToken
  //   return !!this.getToken();
  // }

  // getUser(): Observable<User> {
  //   return this.http.get<User>('http://localhost:4000/auth/register');
  // }





}
