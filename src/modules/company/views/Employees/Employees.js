import React from "react";

import { makeStyles } from "@material-ui/core";

import checkAccess from "modules/auth/hoc/checkAccess";
import NoAccess from "modules/auth/components/NoAccess";

import EmployeesProvider from "./EmployeesContext";
import EmployeesToolbar from "./EmployeesToolbar";
import EmployeesTable from "./EmployeesTable";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(),
        overflow: "auto"
    },
}));

const Employees = () => {
    const classes = useStyles();
    return (
        <EmployeesProvider>
            <div className={classes.root}>
                <EmployeesToolbar />
                <EmployeesTable />
            </div>
        </EmployeesProvider>
    );
};

export default checkAccess({
    roles: ["company:employee:list"],
    noAccess: () => <NoAccess />,
})(Employees);
