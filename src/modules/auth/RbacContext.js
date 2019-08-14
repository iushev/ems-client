import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import api from 'api';

export const RbacContext = React.createContext();
export const RbacConsumer = RbacContext.Consumer;

class RbacProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rbac: null
        };

        this.checkAccess = this.checkAccess.bind(this);
        this._checkAccessRecursive = this._checkAccessRecursive.bind(this);
        this._executeRule = this._executeRule.bind(this);
    }

    componentDidMount() {
        api.auth.rbac()
            .then((data) => {
                this.setState({
                    rbac: this._normalizeRbacItems(data)
                });
            });
    }

    checkAccess(permissionName, params = {}, assignments = []) {
        if (assignments.length === 0) {
            return false;
        }
        return this._checkAccessRecursive(permissionName, params, assignments);
    }

    _normalizeRbacItems(rbac) {
        for (const itemName in rbac.items) {
            if (!rbac.items.hasOwnProperty(itemName)) {
                continue;
            }
            if (!rbac.items[itemName].children) {
                continue;
            }
            for (const childName of rbac.items[itemName].children) {
                if (!rbac.items[childName].parents) {
                    rbac.items[childName].parents = [];
                }
                rbac.items[childName].parents.push(itemName);
            }
        }
        return rbac;
    }

    _checkAccessRecursive(itemName, params, assignments) {
        if (!this.state.rbac.items[itemName]) {
            return false;
        }

        const item = this.state.rbac.items[itemName];

        if (!this._executeRule(item, params)) {
            return false;
        }

        if ((assignments.includes(itemName))
            || this.props.defaultRoles.includes(itemName)
        ) {
            return true;
        }

        if (!item.parents) {
            return false;
        }

        return item.parents.some((parentName) => this._checkAccessRecursive(parentName, params, assignments));
    }

    _executeRule(item, params) {
        if (!item.rule) {
            return true;
        }
        return this.state.rbac.rules[item.rule].execute(this.props.user.id, params);
    }

    render() {
        const { rbac } = this.state;

        let children = null;
        if (rbac) {
            children = this.props.children;
        }

        return (
            <RbacContext.Provider value={{
                checkAccess: this.checkAccess
            }}>
                { children }
            </RbacContext.Provider>
        );
    }
}

RbacProvider.propTypes = {
    userId: PropTypes.any,
    defaultRoles: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.node,
};

RbacProvider.defaultProps = {
    defaultRoles: [],
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
}

export default connect(mapStateToProps)(RbacProvider);
