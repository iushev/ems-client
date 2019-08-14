import React from "react";
import PropTypes from "prop-types";

import withList from "modules/common/hoc/withList";
import api from "api";

export const EmployeesContext = React.createContext({});

class EmployeesProvider extends React.Component {
    render() {
        const { children, list } = this.props;
        return <EmployeesContext.Provider value={list}>{children}</EmployeesContext.Provider>;
    }
}

EmployeesProvider.propTypes = {
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
    loadMore: api.company.employee.list.bind(api.company.employee),
    params: {
        include: [
            {
                association: "user",
                include: [
                    {
                        association: "assignments",
                        include: ["item"],
                    },
                ],
            },
        ],
        order: ["display_name"],
    },
})(EmployeesProvider);
