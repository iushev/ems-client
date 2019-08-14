import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { RbacContext } from './RbacContext';
import { signInCurrentUser } from './store/actions';

export const UserContext = React.createContext();
export const UserConsumer = UserContext.Consumer;

class UserProvider extends Component {
    constructor(props) {
        super(props);

        this._access = {};

        this.can = this.can.bind(this);
        this.isGuest = this.isGuest.bind(this);

        this.state = {
            loading: !!props.token,
        };
    }

    componentDidMount() {
        const { token } = this.props;
        if (token) {
            this.props.signInCurrentUser()
                .then(() => {
                    this.setState({
                        loading: false
                    });
                });
        }
    }

    isGuest() {
        return !this.props.user || !this.props.user.id;
    }

    get assignments() {
        if (!this.props.user) {
            return [];
        }
        return this.props.user.assignments || [];
    }

    can(permissionName, params = [], allowCaching = true) {
        if (this.props.user && this.props.user.is_superuser) {
            return true;
        }

        if (permissionName === '?') {
            if (this.isGuest()) {
                return true;
            }
        } else if (permissionName === '@') {
            if (!this.isGuest()) {
                return true;
            }
        }
        if (allowCaching && params.length === 0 && this._access[permissionName]) {
            return this._access[permissionName];
        }
        const access = this.context.checkAccess(permissionName, params, this.assignments);
        if (allowCaching && params.length === 0) {
            this._access[permissionName] = access;
        }
        return access;
    }

    render() {
        const children = this.state.loading ? null : this.props.children;
        return (
            <UserContext.Provider value={{
                can: this.can,
                isGuest: this.isGuest,
                id: this.props.user && this.props.user.id
            }}>
                { children }
            </UserContext.Provider>
        );
    }
}

UserProvider.contextType = RbacContext;

UserProvider.propTypes = {
    children: PropTypes.node,
    user: PropTypes.object,
};

UserProvider.defaultProps = {
    user: {
        id: null,
        is_superuser: false,
        assignments: [],
    },
};

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        user: state.auth.user,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        signInCurrentUser: () => dispatch(signInCurrentUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProvider);
