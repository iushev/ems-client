import api from "api";

import { FETCHING_USER, RECEIVE_USER, FETCHING_USER_ERROR, CLEAR_USER } from "./actionTypes";

export const fetchingUser = userId => ({
    type: FETCHING_USER,
    userId,
});

export const receiveUser = (userId, data) => ({
    type: RECEIVE_USER,
    userId,
    data,
});

export const fetchingUserError = (userId, error) => ({
    type: FETCHING_USER_ERROR,
    userId,
    error,
});

export const clearUser = userId => ({
    type: CLEAR_USER,
    userId,
});

export const fetchUser = userId => {
    return dispatch => {
        dispatch(fetchingUser(userId));
        return api.auth.user
            .get(userId)
            .then(data => {
                dispatch(receiveUser(userId, data));
                return data;
            })
            .catch(err => {
                dispatch(fetchingUserError(userId, err.message));
                return err;
            });
    };
};
