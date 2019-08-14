import React from 'react';

import EmployeesView from "modules/company/views/Employees";
import Layout from "./Layout";

const Employees = props => {
    return (
        <Layout>
            <EmployeesView {...props} />
        </Layout>
    );
};

export default Employees;