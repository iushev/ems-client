import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';

import ManageView from 'modules/auth/views/Manage';
import ChangePasswordView from 'modules/auth/views/ChangePassword';

const AuthRoutes = ({ match: { path }}) => (
    <Switch>
        <Route path={`${path}/:tab(users|roles)`} component={ManageView}/>
        <Route path={`${path}/change-password`} component={ChangePasswordView}/>
    </Switch>
);

AuthRoutes.propTypes = {
    match: PropTypes.shape({
        path: PropTypes.string,
    }),
};

export default withRouter(AuthRoutes);
