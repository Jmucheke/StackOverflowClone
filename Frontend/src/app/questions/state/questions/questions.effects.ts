import { QuestionsService } from './../../service/questions.service';
import { map, mergeMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { loadQuestions, loadQuestionsSuccess } from './questions.actions';

@Injectable()
export class QuestionsEffects {
  constructor(private actions$: Actions, private questionsService: QuestionsService) { }

  loadQuestions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadQuestions),
      mergeMap((action) => {
        return this.questionsService.getAllQuestions().pipe(
          map((questions) => {
            return loadQuestionsSuccess({ questions });
          })
        );
      })
    );
  });
}