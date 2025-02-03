import { Action, ActionReducer, ActionReducerMap } from "@ngrx/store";
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as incomeOutcome from './income-outcome/income-outcome.reducer';


export interface AppState {
    ui: ui.UIState,
    user: auth.AuthState,
    incomeOutcome: incomeOutcome.IncomeOutcomeState
};

export const appReducers: ActionReducerMap<AppState> = {
    ui: ui.uiReducer as ActionReducer<ui.UIState, Action<string>>,
    user: auth.authReducer as ActionReducer<auth.AuthState, Action<string>>,
    incomeOutcome: incomeOutcome.incomeOutcomeReducer as ActionReducer<incomeOutcome.IncomeOutcomeState, Action<string>>
};