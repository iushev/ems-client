import React from "react";
import { PropTypes } from "prop-types";

import withList from "modules/common/hoc/withList";
import api from "api";

export const InspectionsContext = React.createContext({});

const InspectionsProvider = ({ children, list }) => (
    <InspectionsContext.Provider value={list}>{children}</InspectionsContext.Provider>
);

InspectionsProvider.propTypes = {
    list: PropTypes.shape({
        ids: PropTypes.array,
        data: PropTypes.object,
        hasMore: PropTypes.bool,
        loadMore: PropTypes.func,
        add: PropTypes.func,
        update: PropTypes.func,
        remove: PropTypes.func,
        error: PropTypes.object,
    }),
};

export default withList({
    loadMore: api.inspections.inspection.list.bind(api.inspections.inspection),
    params: {
        include: ["object", "inspector"],
        order: [
            ["date", "DESC"],
            ["object", "display_name"]
        ]
    },
})(InspectionsProvider);
