import React from "react";

import { makeStyles } from "@material-ui/core";

import checkAccess from "modules/auth/hoc/checkAccess";
import NoAccess from "modules/auth/components/NoAccess";

import CustomersProvider from "./CustomersContext";
import CustomersToolbar from "./CustomersToolbar";
import CustomersTable from "./CustomersTable";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(),
        overflow: "auto"
    },
}));

const Customers = () => {
    const classes = useStyles();
    return (
        <CustomersProvider>
            <div className={classes.root}>
                <CustomersToolbar />
                <CustomersTable />
            </div>
        </CustomersProvider>
    );
};

export default checkAccess({
    roles: ['commerce:customer:list'],
    noAccess: () => <NoAccess />
})(Customers);
