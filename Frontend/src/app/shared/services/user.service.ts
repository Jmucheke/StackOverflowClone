import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { IUserProfile, Question } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }
  
  getUserProfile(): Observable<IUserProfile> {
    return this.http
      .get<IUserProfile>(`http://localhost:4000/users/profile`)
  }

  
}
