import { ActionReducerMap } from "@ngrx/store";
import { AuthState } from "./auth.state";
import { authReducer } from "./reducers/auth.reducer";
// import { LoginState } from "./reducers/login.reducer";

// export interface AppState {
//   login: LoginState;
// }

export interface AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer
};
