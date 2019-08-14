import React from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import EmployeeAccountForm, { formId as employeeAccountFormId } from "../EmployeeAccountForm";
import api from "api";

const CreateEmployeeAccountDialog = ({ employeeId, open, onClose, onCreateEmployeeAccount, ...props }) => {
    function createAccount(values) {
        return api.company.employee
            .createAccount(employeeId, values, {
                include: [
                    {
                        association: "user",
                        include: [
                            {
                                association: "assignments",
                                include: ["item"],
                            },
                        ],
                    },
                ],
            })
            .then(employee => {
                onCreateEmployeeAccount(employee);
                return employee;
            });
    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="create-employee-account-dialog-title" fullWidth>
            <DialogTitle id="create-employee-account-dialog-title">Create Employee Account</DialogTitle>
            <DialogContent>
                <EmployeeAccountForm
                    createEmployeeAccount={true}
                    initialValues={{
                        is_active: true
                    }}
                    onSubmit={createAccount}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="contained">
                    Cancel
                </Button>
                <Button variant="contained" color="primary" type="submit" form={employeeAccountFormId}>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

CreateEmployeeAccountDialog.propTypes = {
    employeeId: PropTypes.number,
};

export default CreateEmployeeAccountDialog;
