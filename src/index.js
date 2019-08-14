import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import {} from "@material-ui/core/";

import App from "views/App";
import ReduxProvider from "ReduxProvider";
import AppProvider from "AppContext";

import "index.css";

import * as serviceWorker from "serviceWorker";

const debug = require("debug");
if (process.env.REACT_APP_DEBUG) {
    debug.enable(process.env.REACT_APP_DEBUG);
}

ReactDOM.render(
    <ReduxProvider>
        <BrowserRouter>
            <AppProvider>
                <App />
            </AppProvider>
        </BrowserRouter>
    </ReduxProvider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
