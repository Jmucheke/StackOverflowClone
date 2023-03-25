import { UserState } from './user.state';
import { createFeatureSelector, createSelector } from "@ngrx/store";





export const USER_STATE_NAME = 'user';
const getUserState = createFeatureSelector<UserState>(USER_STATE_NAME);

export const loadUser = createSelector(getUserState, (state) => {

  return state.user;
  
  
});

export const getUserQuestions = createSelector(getUserState, (state)=>{
  return state.questions;

})

export const getAllUsers = createSelector(getUserState, (state) => {
  return state.users;

})