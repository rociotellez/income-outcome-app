import { createAction, props } from "@ngrx/store";
import { User } from "../models/user.model";

export const setUser = createAction(
    '[Auth Component] Set User',
    props<{ user: User }>()
);

export const unSetUser = createAction('[Auth Component] Unset User');