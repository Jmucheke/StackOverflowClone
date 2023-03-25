import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuestionsState } from './questions.state';


export const QUESTION_STATE_NAME = 'question';
const getQuestionsState = createFeatureSelector<QuestionsState>(QUESTION_STATE_NAME);

// State to get all questions
export const getQuestions = createSelector(getQuestionsState, (state) => {

  console.log(state.questions);
  return state.questions;
});


// get Single Question
export const getQuestionDetails = (questionId:string) =>
createSelector(
  getQuestionsState, (state) =>{
    return state.questions.find((p)=>p.id=questionId)
  }
)

// export const getQuestionById = createSelector(getQuestionsState, (state, props) => {
//   return state.questions.find((questions) => question.id === props.id);
// });
