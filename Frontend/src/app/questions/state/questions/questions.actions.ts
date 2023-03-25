import { createAction, props } from '@ngrx/store';
import { Message, Question } from 'src/app/shared/interfaces/interfaces';

export const ADD_QUESTION_ACTION = '[questions page] add question';
export const ADD_QUESTION_SUCCESS = '[questions page] add question success'
export const UPDATE_QUESTION_ACTION = '[questions page] update question';
export const DELETE_QUESTION_ACTION = '[questions page] delete question';
export const LOAD_QUESTIONS = '[questions page] load questions';
export const LOAD_QUESTIONS_SUCCESS = '[questions page] load questions success';
export const UPDATE_QUESTION_SUCCESS = '[questions page] update question success';
export const DELETE_QUESTION_SUCCESS = '[questions page] delete question success';
export const LOAD_QUESTION_BY_ID = '[one question page] load one question';
export const LOAD_QUESTION_BY_ID_SUCCESS = '[one question page] load one question success';


export const addQuestion = createAction(ADD_QUESTION_ACTION, props<{ question: Question }>());
export const addQuestionSuccess = createAction(
  ADD_QUESTION_SUCCESS,
  props<{ message: Message }>()
);

export const updateQuestion = createAction(
  UPDATE_QUESTION_ACTION,
  props<{ question: Question }>()
);

export const updateQuestionSuccess = createAction(
  UPDATE_QUESTION_SUCCESS,
  props<{ question: Question}>()
);

export const deleteQuestion = createAction(
  DELETE_QUESTION_ACTION,
  props<{ id: string }>()
);
export const deleteQuestionSuccess = createAction(
  DELETE_QUESTION_SUCCESS,
  props<{ id: string }>()
);

export const loadQuestions = createAction(LOAD_QUESTIONS);
export const loadQuestionsSuccess = createAction(
  LOAD_QUESTIONS_SUCCESS,
  props<{ questions: Question[] }>()
);

export const loadOneQuestionById = createAction(
  LOAD_QUESTION_BY_ID,
  props<{id:string}>()
  );

export const loadOneQuestionByIdSuccess = createAction(
  LOAD_QUESTION_BY_ID_SUCCESS,
  props<{ question: Question }>()
)
