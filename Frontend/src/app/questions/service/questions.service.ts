import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Message, Question } from 'src/app/shared/interfaces/interfaces';
@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private http: HttpClient) { }

  getAllQuestions(): Observable<Question[]> {
    return this.http
      .get<Question[]>(`http://localhost:4000/questions/allQuestions`)
  }

  addQuestion(question: Question): Observable<Message> {
    return this.http.post<Message>('http://localhost:4000/questions/askQuestion', question)
  }

  getAllUserQuestions(): Observable<Question[]> {
    return this.http
      .get<Question[]>(`http://localhost:4000/questions/getQuestionsByUser`)
  }

  getOneQuestion(id: string): Observable<Question> {
    return this.http.get<Question>(`http://localhost:4000/questions/getQuestionById/${id}`)
  }

  // updateQuestion(post: Post) {
  //   const postData = {
  //     [post.id]: { title: post.title, description: post.description },
  //   };
  //   return this.http.patch(
  //     `https://vue-completecourse.firebaseio.com/posts.json`,
  //     postData
  //   );
  // }

  deleteQuestion(id: string) {
    return this.http.delete(
      `https://vue-completecourse.firebaseio.com/posts/${id}.json`
    );
  }
}
