import React from "react";
import { Link } from 'react-router-dom';

import { makeStyles } from "@material-ui/core";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

import CheckAccess from "modules/auth/components/CheckAccess";

const useStyles = makeStyles(theme => ({
    spacer: {
        flexGrow: 1,
    },
    actions: {
        flexShrink: 1,
    },
    action: {
        marginRight: theme.spacing(),
    },
}));

const InspectionListToolbar = () => {
    const classes = useStyles();

    return (
        <Toolbar>
            <div className={classes.spacer}>
                <Typography variant="h4">Inspections</Typography>
            </div>
            <div className={classes.actions}>
                <CheckAccess roles={['inspections:inspection:create']}>
                    <Tooltip title="Create inspection">
                        <Button
                            aria-label="Create inspection"
                            variant="contained"
                            component={Link}
                            to='/inspections/create'
                        >
                            New Inspection
                        </Button>
                    </Tooltip>
                </CheckAccess>
            </div>
        </Toolbar>
    );
};

export default InspectionListToolbar;
