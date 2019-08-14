import React from "react";
import PropTypes from "prop-types";

import withList from "modules/common/hoc/withList";
import api from "api";

export const CustomersContext = React.createContext({});

class CustomersProvider extends React.Component {
    render() {
        const { children, list } = this.props;
        return (
            <CustomersContext.Provider
                value={list}
            >
                {children}
            </CustomersContext.Provider>
        );
    }
}

CustomersProvider.propTypes = {
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
    loadMore: api.commerce.customer.list.bind(api.commerce.customer),
    params: {
        where: {
            active: true,
        },
        order: ["display_name"],
    }
})(CustomersProvider);
