import React, { useState, useContext } from "react";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

import CheckAccess from "modules/auth/components/CheckAccess";
import CreateEmployeeDialog from "modules/company/components/CreateEmployeeDialog";
import { EmployeesContext } from "./EmployeesContext";

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

const EmployeesToolbar = () => {
    const classes = useStyles();
    const [createEmployeeOpen, setCreateEmployeeOpen] = useState(false);
    const employees = useContext(EmployeesContext);

    function openCreateEmployee() {
        setCreateEmployeeOpen(true);
    }

    function closeCreateEmployee() {
        setCreateEmployeeOpen(false);
    }

    function handleCreateEmployee() {
        employees.refresh();
        closeCreateEmployee();
    }

    return (
        <Toolbar>
            <div className={classes.spacer}>
                <Typography variant="h4">Employees</Typography>
            </div>
            <div className={classes.actions}>
                <CheckAccess roles={["commerce:employee:create"]}>
                    <Tooltip title="Add employee">
                        <Button
                            aria-label="Add employee"
                            variant="contained"
                            className={classes.action}
                            onClick={openCreateEmployee}
                        >
                            Add Employee
                        </Button>
                    </Tooltip>
                </CheckAccess>
            </div>
            <CreateEmployeeDialog
                open={createEmployeeOpen}
                onClose={closeCreateEmployee}
                onCreateEmployee={handleCreateEmployee}
            />
        </Toolbar>
    );
};

export default EmployeesToolbar;
