
import { createReducer, on } from '@ngrx/store';
import { addQuestion, updateQuestion, deleteQuestion, loadQuestionsSuccess } from './questions.actions';
import { initialState } from './questions.state';

export const QuestionsReducer = createReducer(
  initialState,
  on(addQuestion, (state, action) => {
    let question = { ...action.question };

    question.id = (state.questions.length + 1).toString();

    return {
      ...state,
      questions: [...state.questions, question],
    };
  }),
  on(updateQuestion, (state, action) => {
    const updatedQuestions = state.questions.map((question) => {
      return action.question.id === question.id ? action.question : question;
    });

    return {
      ...state,
      questions: updatedQuestions,
    };
  }),
  on(deleteQuestion, (state, { id }) => {
    const updatedQuestions = state.questions.filter((question) => {
      return question.id !== id;
    });

    return {
      ...state,
      questions: updatedQuestions,
    };
  }),
  on(loadQuestionsSuccess, (state, action) => {
    return {
      ...state,
      questions: action.questions,
    };
  })
);
