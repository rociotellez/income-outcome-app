import { Action, createReducer, on } from "@ngrx/store";
import { IncomeOutcome } from "../models/income-outcome.model";
import { setItems, unsetItems } from "./income-outcome.actions";
import { AppState } from "../app.reducer";

export interface IncomeOutcomeState {
    items: IncomeOutcome[];
};

export interface AppStateWithIncomeOutcome extends AppState {
    incomeOutcome: IncomeOutcomeState
};

export const initialState: IncomeOutcomeState = {
    items: []
};

const _incomeOutcomeReducer = createReducer(initialState,
    on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
    on(unsetItems, state => ({ ...state, items: [] }))
);

export function incomeOutcomeReducer(state: IncomeOutcomeState, action: Action) {
    return _incomeOutcomeReducer(state, action);
};