import React from "react";

import { makeStyles } from "@material-ui/styles";

import checkAccess from "modules/auth/hoc/checkAccess";
import NoAccess from "modules/auth/components/NoAccess";

import UsersProvider from "./UsersContext";
import UsersToolbar from "./UsersToolbar";
import UsersTable from "./UsersTable";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(),
    },
}));

const Users = () => {
    const classes = useStyles();
    return (
        <UsersProvider>
            <div className={classes.root}>
                <UsersToolbar />
                <UsersTable />
            </div>
        </UsersProvider>
    );
};

export default checkAccess({
    roles: ['auth:user:list'],
    noAccess: () => <NoAccess />
})(Users);
