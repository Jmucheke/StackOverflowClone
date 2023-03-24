import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuestionsState } from './questions.state';


export const QUESTION_STATE_NAME = 'question';
const getQuestionsState = createFeatureSelector<QuestionsState>(QUESTION_STATE_NAME);

export const getQuestions = createSelector(getQuestionsState, (state) => {

  console.log(state.questions);
  return state.questions;
});

// export const getQuestionById = createSelector(getQuestionsState, (state, props) => {
//   return state.questions.find((questions) => question.id === props.id);
// });
