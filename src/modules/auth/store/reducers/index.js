import { combineReducers } from 'redux';

import user from './user';
import token from './token';
import rememberMe from './rememberMe';

const reducer = combineReducers({
    user,
    token,
    rememberMe,
});

export default reducer;

