import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Question } from 'src/app/shared/interfaces/interfaces';
@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private http: HttpClient) { }

  getAllQuestions(): Observable<Question[]> {
    return this.http
      .get<Question[]>(`http://localhost:4000/questions/allQuestions`)
      .pipe(
        map((data) => {
          const questions: Question[] = [];
          for (let key in data) {
            questions.push({ ...data[key], id: key });
          }
          return questions;
        })
      );
  }
}