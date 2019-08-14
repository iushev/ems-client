import {
    SHOW_CONFIRM_SYNC
} from '../actions';

const initialState = false;

export const reduser = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_CONFIRM_SYNC: return action.show;
        default: return state;
    }
};

export default reduser;