import {
    SIGN_IN_USER,
    SIGN_OUT_USER,
} from '../actions/actionTypes';

const initialState = false;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN_USER:
            return !!action.rememberMe;
        case SIGN_OUT_USER:
            return false;
        default:
            return state;
    }
};

export default reducer;
