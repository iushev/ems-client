import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

// import app from './app';
import auth from 'modules/auth/store/reducers';
import flashMessages from 'modules/common/components/FlashMessage/store/reducer';
import qbo from 'modules/qbo/store/redusers';
// import customers from './customers';
// import employees from './employees';

const rootReducer = combineReducers({
    // app,
    auth,
    form,
    flashMessages,
    qbo,
    // customers,
    // employees,
});

export default rootReducer;
