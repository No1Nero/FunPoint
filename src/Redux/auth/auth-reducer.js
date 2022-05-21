import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import authActions from "./auth-actions";

const initialUserState = {
    username: null,
    firstName: null,
    lastName: null,
    email: null,
    token: null,
};

const user = createReducer(initialUserState, {
    [authActions.registerSuccess]: () => initialUserState,
    [authActions.loginSuccess]: (_, {payload}) => payload,
    [authActions.logoutSuccess]: () => initialUserState,
    [authActions.getCurrentUserSuccess]: (_, {payload}) => payload,
});

const error = createReducer(null, {
    [authActions.registerError]: (_, {payload}) => payload,
    [authActions.loginError]: (_, {payload}) => payload,
    [authActions.resetError]: () => null,
});

const authReducer = combineReducers({
    user,
    error,
});

export default authReducer;