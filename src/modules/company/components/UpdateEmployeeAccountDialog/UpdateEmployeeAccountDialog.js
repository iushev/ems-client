import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import EmployeeAccountForm, { formId as employeeAccountFormId } from "../EmployeeAccountForm";
import api from "api";

const UpdateEmployeeAccountDialog = ({ employeeId, open, onClose, onUpdateEmployeeAccount, ...props }) => {
    const [employee, setEmployee] = useState({});

    useEffect(() => {
        if (employeeId) {
            api.company.employee
                .get(employeeId, {
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
                .then(employee => setEmployee(employee));
        } else {
            setEmployee({});
        }
    }, [employeeId]);

    function updateAccount(values) {
        return api.company.employee
            .updateAccount(employeeId, values, {
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
                onUpdateEmployeeAccount(employee);
                return employee;
            });
    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="update-employee-account-dialog-title" fullWidth>
            <DialogTitle id="update-employee-account-dialog-title">Update Employee Account</DialogTitle>
            <DialogContent>
                <EmployeeAccountForm
                    initialValues={
                        employee && {
                            username: employee.user && employee.user.username,
                            role:
                                (employee.user &&
                                    employee.user.assignments &&
                                    employee.user.assignments.length > 0 &&
                                    employee.user.assignments[0].item_name) ||
                                "",
                            is_active: employee.user && employee.user.is_active,
                        }
                    }
                    onSubmit={updateAccount}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="contained">
                    Cancel
                </Button>
                <Button variant="contained" color="primary" type="submit" form={employeeAccountFormId}>
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};

UpdateEmployeeAccountDialog.propTypes = {
    employeeId: PropTypes.number,
};

export default UpdateEmployeeAccountDialog;
