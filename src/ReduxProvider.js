import React from 'react';
import { Provider } from 'react-redux';

import createStore from 'store';

const ReduxProvider = ({ children, initialState = {} }) => {
    const store = createStore(initialState);
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

export default ReduxProvider;
