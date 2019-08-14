import React from 'react';
import PropTypes from 'prop-types';
import CheckAccess from '../components/CheckAccess';

const checkAccess = ({ allow = true, roles = [], roleParams, match, noAccess}) =>  (WrappedComponent) => {
    const CheckAccessWrapper = ({ forwardedRef, ...props }) => (
        <CheckAccess
            allow={allow}
            roles={roles}
            roleParams={roleParams}
            match={match}
            noAccess={noAccess}
        >
            <WrappedComponent ref={forwardedRef} {...props} />
        </CheckAccess>
    );

    CheckAccessWrapper.displayName = `CheckAccess(${getDisplayName(WrappedComponent)})`;
    CheckAccessWrapper.propTypes = {
        forwardedRef: PropTypes.object,
    };

    return React.forwardRef((props, ref) => {
        return <CheckAccessWrapper {...props} forwardedRef={ref}/>;
    });
};

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default checkAccess;