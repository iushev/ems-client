import {
    SIGN_IN_USER,
    SIGN_OUT_USER,
} from '../actions/actionTypes';

const initialState = null;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN_USER:
            return action.user;
        case SIGN_OUT_USER:
            return null;
        default:
            return state;
    }
};

export default reducer;
