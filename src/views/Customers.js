import React from "react";

import CustomersView from "modules/commerce/views/Customers";
import Layout from "./Layout";

const Customers = props => {
    return (
        <Layout>
            <CustomersView {...props} />
        </Layout>
    );
};

export default Customers;
