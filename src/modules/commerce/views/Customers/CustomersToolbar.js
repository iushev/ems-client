import React, { /*useState, useContext*/ } from "react";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

import CheckAccess from "modules/auth/components/CheckAccess";
import { /* CustomersContext */ } from "./CustomersContext";

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

const CustomersToolbar = () => {
    const classes = useStyles();
    // const customersContext = useContext(CustomersContext);

    function openCreateCustomer() {

    }

    return (
        <Toolbar>
            <div className={classes.spacer}>
                <Typography variant="h4">Customers</Typography>
            </div>
            <div className={classes.actions}>
                {/* <CheckAccess roles={["commerce:customer:create"]}>
                    <Tooltip title="Add customer">
                        <Button
                            aria-label="Add customer"
                            variant="contained"
                            className={classes.action}
                            onClick={openCreateCustomer}
                        >
                            Create
                        </Button>
                    </Tooltip>
                </CheckAccess> */}
            </div>
        </Toolbar>
    );
};

export default CustomersToolbar;
