import { Action, ActionReducer, ActionReducerMap } from "@ngrx/store";
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';


export interface AppState {
    ui: ui.UIState,
    user: auth.AuthState
};

export const appReducers: ActionReducerMap<AppState> = {
    ui: ui.uiReducer as ActionReducer<ui.UIState, Action<string>>,
    user: auth.authReducer as ActionReducer<auth.AuthState, Action<string>>
};