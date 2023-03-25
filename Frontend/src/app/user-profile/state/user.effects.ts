import { QuestionsService } from './../../questions/service/questions.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap, map } from 'rxjs';
import { AppState } from 'src/app/shared/store/app.state';
import { setLoadingSpinner } from 'src/app/shared/store/state/actions/shared.action';
import { UserService } from './../../shared/services/user.service';
import { getUser, getUserSuccess, loadQuestions, loadQuestionsSuccess, loadAllUsersSuccess, loadAllUsers } from './user.actions';



@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService, private store: Store<AppState>, private questionsService:QuestionsService) { }

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getUser),
      mergeMap((action) => {
        return this.userService.getUserProfile().pipe(
          map((user) => {
            console.log(user);
            
            // this.store.dispatch(setLoadingSpinner({ status: false }))

            return getUserSuccess({ user });
          })
        );
      })
    );
  });

  loadUserQuestions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadQuestions),
      mergeMap((action) => {
        return this.questionsService.getAllUserQuestions().pipe(
          map((questions) => {
            this.store.dispatch(setLoadingSpinner({ status: false }))

            return loadQuestionsSuccess({ questions });
          })
        );
      })
    );
  });

  loadAllUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadAllUsers),
      mergeMap((action) => {
        return this.userService.getAllUsers().pipe(
          map((users) => {
            this.store.dispatch(setLoadingSpinner({ status: false }))

            return loadAllUsersSuccess({ users });
          })
        );
      })
    );
  });

}
