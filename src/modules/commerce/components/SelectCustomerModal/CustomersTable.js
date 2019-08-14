import React from "react";

import withList from "modules/common/hoc/withList";
import api from "api";
import InfiniteScrollTable from "modules/common/components/InfiniteScrollTable/InfiniteScrollTable";
import TextField from "modules/common/components/InfiniteScrollTable/TextField";

const CustomersTable = ({ selectionChanged, list: { ids, data, hasMore, loadMore, error } }) => {
    return (
        <InfiniteScrollTable
            data={{
                ids,
                records: data,
            }}
            hasMore={hasMore}
            loadMore={loadMore}
            selectableRows={1}
            selectionChanged={selectionChanged}
            errorLoading={error !== null}
        >
            <TextField label="Pool" source="display_name" />
            <TextField label="Phone" source="primary_phone" />
        </InfiniteScrollTable>
    );
};

CustomersTable.displayName = "SelectCustomerModal->CustomersTable";

export default withList({
    loadMore: api.commerce.customer.list.bind(api.commerce.customer),
    params: {
        where: {
            active: true,
        },
        order: ["display_name"],
    },
})(CustomersTable);
