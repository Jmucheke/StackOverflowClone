import { createAction, props } from '@ngrx/store';
import { IUserProfile, Question } from './../../shared/interfaces/interfaces';




export const GET_USER = '[user page] load user';
export const GET_USER_SUCCESS = '[user page] load user success';
export const LOAD_QUESTIONS = '[questions page] load questions';
export const LOAD_QUESTIONS_SUCCESS = '[questions page] load questions success';

export const GET_ALL_USER = '[user page] load all users';
export const GET_ALL_USER_SUCCESS = '[user page] load all users success';

export const getUser = createAction(GET_USER);
export const getUserSuccess = createAction(
  GET_USER_SUCCESS,
  props<{ user: IUserProfile }>()
);

export const loadQuestions = createAction(LOAD_QUESTIONS);
export const loadQuestionsSuccess = createAction(
  LOAD_QUESTIONS_SUCCESS,
  props<{ questions: Question[] }>()
);

export const loadAllUsers = createAction(GET_ALL_USER);
export const loadAllUsersSuccess = createAction(
  GET_ALL_USER_SUCCESS,
  props<{ users: IUserProfile[] }>()
);