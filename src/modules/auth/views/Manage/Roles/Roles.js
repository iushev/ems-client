import React from 'react';

import { makeStyles } from "@material-ui/styles";
import RolesProvider from './RolesContext';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(),
    },
}));

const Roles = () => {
    const classes = useStyles();
    return (
        <RolesProvider>
            <div className={classes.root}>
                Roles
            </div>
        </RolesProvider>
    );
};

export default Roles;