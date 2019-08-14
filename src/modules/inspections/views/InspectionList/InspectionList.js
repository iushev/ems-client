import React from "react";

import { makeStyles } from "@material-ui/core";

import checkAccess from "modules/auth/hoc/checkAccess";
import NoAccess from "modules/auth/components/NoAccess";

import InspectionTable from "./InspectionTable";
import InspectionListToolbar from "./InspectionListToolbar";
import InspectionsProvider from "./InspectionsContext";

const debug = require("debug")("ems");

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(),
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        [theme.breakpoints.down("sm")]: {
            margin: 0,
        },
    },
}));

const InspectionList = () => {
    debug("Render [InspectionList]");

    const classes = useStyles();

    return (
        <InspectionsProvider>
            <div className={classes.root}>
                <InspectionListToolbar />
                <InspectionTable />
            </div>
        </InspectionsProvider>
    );
};

export default checkAccess({
    roles: ['inspections:inspection:list'],
    noAccess: () => <NoAccess />
})(InspectionList);
