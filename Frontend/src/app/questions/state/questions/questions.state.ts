import { Question } from "src/app/shared/interfaces/interfaces";


export interface QuestionsState {
  questions: Question[];
}

export const initialState: QuestionsState = {
  questions: [],
};