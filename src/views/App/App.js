import React, { useContext } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import CssBaseline from "@material-ui/core/CssBaseline";
import MomentUtils from '@date-io/moment';

import "typeface-roboto";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import { AppContext } from "AppContext";

import FlashMessage from "modules/common/components/FlashMessage";

import AuthRoutes from "modules/auth/routes";
import SignOut from "modules/auth/views/SignOut";
import ResetPassword from "modules/auth/views/ResetPassword";
import RbacProvider from "modules/auth/RbacContext";
import UserProvider from "modules/auth/UserContext";
import CheckAccess from "modules/auth/components/CheckAccess";
import checkAccess from "modules/auth/hoc/checkAccess";

import QboRoutes from "modules/qbo/routes";
import ConfirmSync from "modules/qbo/components/ConfirmSync";
import { showConfirmSync } from "modules/qbo/store/actions";

import Dashboard from "views/Dashboard";
import Customers from "views/Customers";
import Employees from "views/Employees";
import Inspections from "views/Inspections";

import SignIn from "./SignIn";
import Layout from "views/Layout";

const debug = require("debug")("ems");

library.add(fas);

const theme = createMuiTheme({
    palette: {
        primary: {
            light: blue[400],
            main: blue[600],
            dark: blue[800],
        },
    },
});

const ProtectedRoutes = () => {
    return (
        <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/customers" component={Customers} />
            <Route path="/employees" component={Employees} />
            <Route path="/inspections" component={Inspections} />
            <Route path="/auth">
                <Layout>
                    <AuthRoutes />
                </Layout>
            </Route>
            <Route path="/qbo">
                <Layout>
                    <QboRoutes />
                </Layout>
            </Route>
            <Redirect to="/dashboard" />
        </Switch>
    );
};

const App = ({ location, history, showConfirmQboSync, setShowConfirmQboSync }) => {
    debug("Render [App]");
    const appContext = useContext(AppContext);

    function qboSyncCancel() {
        setShowConfirmQboSync(false);
    }

    function qboSyncConfirm() {
        setShowConfirmQboSync(false);
        history.push("/qbo/sync");
    }

    return (
        <MuiThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <RbacProvider>
                    <UserProvider>
                        <CssBaseline />
                        <CheckAccess
                            roles={['qbo:sync']}
                            noAccess={() => null}
                        >
                            <ConfirmSync isOpen={showConfirmQboSync} onCancel={qboSyncCancel} onConfirm={qboSyncConfirm} />
                        </CheckAccess>
                        <Switch>
                            <Route path={appContext.signInPath} exact component={SignIn} />
                            <Route path={appContext.signOutPath} exact component={SignOut} />
                            <Route path={appContext.resetPasswordPath} exact component={ResetPassword} />
                            <Route
                                path="/"
                                component={checkAccess({
                                    roles: ["@"],
                                    noAccess: () => (
                                        <Redirect
                                            to={{
                                                pathname: appContext.signInPath,
                                                state: {
                                                    from: location,
                                                },
                                            }}
                                        />
                                    ),
                                })(ProtectedRoutes)}
                            />
                        </Switch>
                        <FlashMessage flashKey="success" />
                        <FlashMessage flashKey="error" />
                    </UserProvider>
                </RbacProvider>
            </MuiPickersUtilsProvider>
        </MuiThemeProvider>
    );
};

const mapStateToProps = state => {
    return {
        showConfirmQboSync: state.qbo.showConfirmSync,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setShowConfirmQboSync: show => dispatch(showConfirmSync(show)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(App));
