import React from "react";
import PropTypes from "prop-types";

import withList from "modules/common/hoc/withList";
import api from "api";

export const UsersContext = React.createContext({});

class UsersProvider extends React.Component {
    render() {
        const { children, list } = this.props;
        return (
            <UsersContext.Provider
                value={list}
            >
                {children}
            </UsersContext.Provider>
        );
    }
}

UsersProvider.propTypes = {
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
    loadMore: api.auth.user.list.bind(api.auth.user),
})(UsersProvider);
