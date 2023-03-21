import { setLoadingSpinner } from './../actions/shared.action';
import { createReducer, on } from '@ngrx/store';
import { initialState } from '../shared.state';


export const sharedReducer = createReducer(
  initialState, 
  on(setLoadingSpinner, (state, action) =>{
    return{
      state,
      showLoading:action.status
    }

  }))