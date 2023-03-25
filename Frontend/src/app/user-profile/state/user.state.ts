import { Question } from './../../../../../Backend/src/models/index';
import { IUserProfile } from "src/app/shared/interfaces/interfaces";


export interface UserState {
  user: IUserProfile;
  questions: Question[];
  users:IUserProfile[]
}

export const initialState: UserState = {
  user: {
    id:'',
    name:'',
    email:'',
    isAdmin:false,

  },
  questions: [],
  users:[]
};
