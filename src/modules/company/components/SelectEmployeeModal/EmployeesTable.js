import React from "react";

import withList from 'modules/common/hoc/withList';
import api from 'api';
import InfiniteScrollTable from 'modules/common/components/InfiniteScrollTable/InfiniteScrollTable';
import TextField from 'modules/common/components/InfiniteScrollTable/TextField';

const EmployeesTable = ({ selectableEmployees = 1, selectionChanged, list: { ids, data, hasMore, loadMore, error } }) => {
    return (
        <InfiniteScrollTable
            data={{
                ids,
                records: data,
            }}
            hasMore={hasMore}
            loadMore={loadMore}
            selectableRows={selectableEmployees}
            selectionChanged={selectionChanged}
            errorLoading={error !== null}
        >
            <TextField label="Employee" source="display_name" />
            <TextField label="Phone" source="primary_phone" />
        </InfiniteScrollTable>
    );
};

EmployeesTable.displayName = "SelectEmployeeModal->EmployeesTable";

export default withList({
    loadMore: api.company.employee.list.bind(api.company.employee),
    params: {}
})(EmployeesTable);
