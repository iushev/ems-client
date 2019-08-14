import { useContext } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../UserContext';

const CheckAccess = ({allow, roles, roleParams, match, noAccess, children}) => {
    const user = useContext(UserContext);

    function matchRole() {
        if (!roles || roles.length === 0) {
            return true;
        }

        if (typeof roleParams === 'function') {
            roleParams = roleParams();
        }

        return roles.some((role) => user.can(role, roleParams));
    }

    function matchCustom() {
        if (!match) {
            return true;
        }
        return match();
    }

    if (matchRole()
        && matchCustom()
        && allow
    ) {
        return children;
    }

    return noAccess();
};

CheckAccess.propTypes = {
    allow: PropTypes.bool,
    roles: PropTypes.arrayOf(PropTypes.string),
    roleParams: PropTypes.object,
    match: PropTypes.func,
    noAccess: PropTypes.func,
    children: PropTypes.node,
};

CheckAccess.defaultProps = {
    allow: true,
    roles: [],
    noAccess: () => null,
};

export default CheckAccess;