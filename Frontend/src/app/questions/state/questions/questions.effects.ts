import { QuestionsService } from './../../service/questions.service';
import { map, mergeMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { addQuestion, loadQuestions, loadQuestionsSuccess, addQuestionSuccess } from './questions.actions';
import { setLoadingSpinner } from 'src/app/shared/store/state/actions/shared.action';
import { AppState } from 'src/app/shared/store/app.state';
import { Store } from '@ngrx/store';

@Injectable()
export class QuestionsEffects {
  constructor(private actions$: Actions, private questionsService: QuestionsService, private store: Store<AppState>) { }

  loadQuestions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadQuestions),
      mergeMap((action) => {
        return this.questionsService.getAllQuestions().pipe(
          map((questions) => {
            this.store.dispatch(setLoadingSpinner({ status: false }))

            return loadQuestionsSuccess({ questions });
          })
        );
      })
    );
  });


  addQuestion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addQuestion),
      mergeMap((action) => {
        return this.questionsService.addQuestion(action.question).pipe(
          map((message) => {
            console.log(message);

            return addQuestionSuccess({ message });
          })
        );
      })
    );
  });

  // updatePost$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(updatePost),
  //     switchMap((action) => {
  //       return this.postsService.updatePost(action.post).pipe(
  //         map((data) => {
  //           return updatePostSuccess({ post: action.post });
  //         })
  //       );
  //     })
  //   );
  // });
  // deletePost$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(deletePost),
  //     switchMap((action) => {
  //       return this.postsService.deletePost(action.id).pipe(
  //         map((data) => {
  //           return deletePostSuccess({ id: action.id });
  //         })
  //       );
  //     })
  //   );
  // });
}
