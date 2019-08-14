import _ from "lodash";
import api from "api";
import { SIGN_IN_USER, SIGN_OUT_USER } from "./actionTypes";

export const signIn = (token, user, rememberMe) => {
    return {
        type: SIGN_IN_USER,
        token,
        user,
        rememberMe,
    };
};

export const signInUser = (username, password, rememberMe) => {
    return dispatch => {
        return api.auth.sign_in(username, password).then(data => {
            dispatch(signIn(data.token, data.user, rememberMe));
            return data;
        });
    };
};

export const signInCurrentUser = () => {
    return (dispatch, getState) => {
        return api.auth.me().then(data => {
            const state = getState();
            if (!_.isEqual(data, {})) {
                dispatch(signIn(data.token, data.user, state.auth.rememberMe));
            }
            return data;
        });
    };
};

export const signUpUser = data => {
    return dispatch => {
        return api.auth.sign_up(data).then(data => {
            dispatch(signIn(data.token, data.user));
            return data;
        });
    };
};

const _signOutUser = () => {
    return {
        type: SIGN_OUT_USER,
    };
};

export const signOutUser = () => {
    return dispatch => {
        return api.auth.sign_out().then(response => {
            dispatch(_signOutUser());
            return response;
        });
    };
};
