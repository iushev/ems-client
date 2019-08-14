import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';

import Sync from './views/Sync';

const QboRoutes = ({ match: { path }}) => {
    return (
        <Switch>
            <Route path={`${path}/sync`} component={Sync} />
        </Switch>
    );
};

QboRoutes.propTypes = {
    match: PropTypes.shape({
        path: PropTypes.string,
    }),
};

export default withRouter(QboRoutes);
