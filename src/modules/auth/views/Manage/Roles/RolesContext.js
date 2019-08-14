import React from "react";
import PropTypes from "prop-types";

import withList from "modules/common/hoc/withList";
import api from "api";

export const RolesContext = React.createContext({});

class RolesProvider extends React.Component {
    render() {
        const { children, list } = this.props;
        return (
            <RolesContext.Provider
                value={list}
            >
                {children}
            </RolesContext.Provider>
        );
    }
}

RolesProvider.propTypes = {
    list: PropTypes.shape({
        ids: PropTypes.array,
        data: PropTypes.object,
        hasMore: PropTypes.bool,
        loadMore: PropTypes.func,
        add: PropTypes.func,
        update: PropTypes.func,
        error: PropTypes.object,
    }),
};

export default withList({
    loadMore: api.auth.role.list.bind(api.auth.role),
})(RolesProvider);
