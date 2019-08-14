import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/styles";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import UsersView from "modules/auth/views/Manage/Users";
import RolesView from "modules/auth/views/Manage/Roles";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
    }
}));

const Manage = ({
    match: {
        params: { tab },
    },
}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Tabs value={tab}>
                <Tab label="Users" value="users" component={Link} to="/auth/users" />
                <Tab label="Roles" value="roles" component={Link} to="/auth/roles" />
            </Tabs>
            {tab === "users" && <UsersView />}
            {tab === "roles" && <RolesView />}
        </div>
    );
};
export default Manage;

