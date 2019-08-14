import React from 'react';
import PropTypes from 'prop-types';

export const AppContext = React.createContext();
export const AppConsumer = AppContext.Consumer;

class AppProvider extends React.Component {
    state = {
        rootPath: '/',
        signInPath: '/sign-in',
        signOutPath: '/sign-out',
        resetPasswordPath: '/reset-password',
        homePath: '/dashboard',
    };

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}

AppProvider.propTypes = {
    children: PropTypes.any,
};

export default AppProvider;
