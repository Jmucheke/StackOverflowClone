import { createAction, props } from '@ngrx/store';
import { Question } from 'src/app/shared/interfaces/interfaces';

export const ADD_QUESTION_ACTION = '[questions page] add question';
export const UPDATE_QUESTION_ACTION = '[questions page] update question';
export const DELETE_QUESTION_ACTION = '[questions page] delete question';
export const LOAD_QUESTIONS = '[questions page] load questions';
export const LOAD_QUESTIONS_SUCCESS = '[questions page] load questions success';

export const addQuestion = createAction(ADD_QUESTION_ACTION, props<{ question: Question }>());
export const updateQuestion = createAction(
  UPDATE_QUESTION_ACTION,
  props<{ question: Question }>()
);

export const deleteQuestion = createAction(
  DELETE_QUESTION_ACTION,
  props<{ id: string }>()
);

export const loadQuestions = createAction(LOAD_QUESTIONS);
export const loadQuestionsSuccess = createAction(
  LOAD_QUESTIONS_SUCCESS,
  props<{ questions: Question[] }>()
);