import { getUserSuccess, loadQuestionsSuccess, loadAllUsersSuccess } from './user.actions';
import { createReducer, on } from '@ngrx/store';
import { initialState } from './user.state';



export const UserReducer = createReducer(
  initialState,
  on(getUserSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(loadQuestionsSuccess, (state, action) => {
    return {
      ...state,
      questions: action.questions,
    };
  }),
  on(loadAllUsersSuccess, (state, action) => {
    return {
      ...state,
      users: action.users,
    };
  })
)