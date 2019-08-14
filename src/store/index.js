import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import throttle from "lodash/throttle";
import _ from "lodash";

import rootReducer from "./reducers";
import { loadState as loadLocalState, saveState as saveLocalState } from "./localStorage";
import { loadState as loadSessionState, saveState as saveSessionState } from "./sessionStore";

let store;

export { store };

export default (initialState = {}) => {
    const composeEnhancers =
        process.env.NODE_ENV !== "production" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            : compose;

    const localState = loadLocalState();
    const sessionState = loadSessionState();
    const persistedState = _.merge({}, localState, sessionState, initialState);

    store = createStore(rootReducer, persistedState, composeEnhancers(applyMiddleware(thunk)));

    store.subscribe(
        throttle(() => {
            const state = store.getState();
            const auth = state.auth;
            saveLocalState({
                auth: {
                    rememberMe: auth.rememberMe,
                    token: auth.rememberMe ? auth.token : undefined,
                },
            });

            saveSessionState({
                auth: {
                    token: !auth.rememberMe ? auth.token : undefined,
                },
                qbo: {
                    // showConfirmSync: state.qbo.showConfirmSync,
                },
            });
        }, 1000)
    );

    return store;
};
