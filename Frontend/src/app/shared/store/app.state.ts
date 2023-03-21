import { sharedReducer } from "./state/reducers/shared.reducer";
import { SHARED_STATE_NAME } from "./state/selector/shared.selector";
import { SharedState } from "./state/shared.state";

// export interface AppState {
//   login: LoginState;
// }

export interface AppState {
  [SHARED_STATE_NAME]:SharedState
}

export const appReducer ={
  [SHARED_STATE_NAME]:sharedReducer
};
