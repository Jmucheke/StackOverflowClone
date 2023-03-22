import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuestionsState } from './questions.state';


export const QUESTION_STATE_NAME = 'questions';
const getQuestionsState = createFeatureSelector<QuestionsState>(QUESTION_STATE_NAME);

export const getQuestions = createSelector(getQuestionsState, (state) => {
  return state.questions;
});

// export const getQuestionById = createSelector(getQuestionsState, (state, props) => {
//   return state.questions.find((question) => question.id === props.id);
// });