import React, { useState, useContext } from "react";
import PropTypes from "prop-types";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { UserContext } from "modules/auth/UserContext";
import { EmployeesContext } from "./EmployeesContext";

import UpdateEmployeeDialog from "modules/company/components/UpdateEmployeeDialog";
import CreateEmployeeAccountDialog from "modules/company/components/CreateEmployeeAccountDialog";
import UpdateEmployeeAccountDialog from "modules/company/components/UpdateEmployeeAccountDialog";

const EmployeeContextMenu = ({ employee, employeeIndex, ...props }) => {
    const [isOpenUpdateEmployeeDialog, setOpenUpdateEmployeeDialog] = useState(false);
    const [isOpenCreateEmployeeAccountDialog, setOpenCreateEmployeeAccountDialog] = useState(false);
    const [isOpenUpdateEmployeeAccountDialog, setOpenUpdateEmployeeAccountDialog] = useState(false);

    const userContext = useContext(UserContext);
    const employees = useContext(EmployeesContext);

    if (!employee) {
        return null;
    }

    function openUpdateEmployeeDialog() {
        setOpenUpdateEmployeeDialog(true);
    }

    function closeUpdateEmployeeDialog() {
        setOpenUpdateEmployeeDialog(false);
        props.onClose();
    }

    function handleUpdateEmployee(employee) {
        employees.update(employee, employeeIndex);
        closeUpdateEmployeeDialog();
    }

    function openCreateEmployeeAccountDialog() {
        setOpenCreateEmployeeAccountDialog(true);
    }

    function closeCreateEmployeeAccountDialog() {
        setOpenCreateEmployeeAccountDialog(false);
        props.onClose();
    }

    function handleCreateEmployeeAccount(employee) {
        employees.update(employee, employeeIndex);
        closeCreateEmployeeAccountDialog();
    }

    function openUpdateEmployeeAccountDialog() {
        setOpenUpdateEmployeeAccountDialog(true);
    }

    function closeUpdateEmployeeAccountDialog() {
        setOpenUpdateEmployeeAccountDialog(false);
        props.onClose();
    }

    function handleUpdateEmployeeAccount(employee) {
        employees.update(employee, employeeIndex);
        closeUpdateEmployeeAccountDialog();
    }

    function confirmInactivate() {}

    function activate() {}

    return (
        <React.Fragment>
            <Menu {...props}>
                <MenuItem onClick={openUpdateEmployeeDialog} disabled={!userContext.can("company:employee:update")}>
                    Edit employee
                </MenuItem>
                {employee.user_id ? (
                    <MenuItem onClick={openUpdateEmployeeAccountDialog}
                        disabled={!userContext.can("company:employee:update_account")}
                    >
                        Update account
                    </MenuItem>
                ) : (
                    <MenuItem onClick={openCreateEmployeeAccountDialog}
                        disabled={!userContext.can("company:employee:create_account")}
                    >
                        Create account
                    </MenuItem>
                )}
                {employee.active ? (
                    <MenuItem onClick={confirmInactivate} disabled={!userContext.can("company:employee:update")}>
                        Make inactive
                    </MenuItem>
                ) : (
                    <MenuItem onClick={activate} disabled={!userContext.can("company:employee:update")}>
                        Active
                    </MenuItem>
                )}
            </Menu>
            <UpdateEmployeeDialog
                employeeId={isOpenUpdateEmployeeDialog ? employee && employee.id : null}
                open={isOpenUpdateEmployeeDialog}
                onClose={closeUpdateEmployeeDialog}
                onUpdateEmployee={handleUpdateEmployee}
            />
            <CreateEmployeeAccountDialog
                employeeId={isOpenCreateEmployeeAccountDialog ? employee && employee.id: null}
                open={isOpenCreateEmployeeAccountDialog}
                onClose={closeCreateEmployeeAccountDialog}
                onCreateEmployeeAccount={handleCreateEmployeeAccount}
            />
            <UpdateEmployeeAccountDialog
                employeeId={isOpenUpdateEmployeeAccountDialog ? employee && employee.id: null}
                open={isOpenUpdateEmployeeAccountDialog}
                onClose={closeUpdateEmployeeAccountDialog}
                onUpdateEmployeeAccount={handleUpdateEmployeeAccount}
            />
        </React.Fragment>
    );
};

EmployeeContextMenu.propTypes = {
    employee: PropTypes.object,
    employeeIndex: PropTypes.number,
    open: PropTypes.bool,
    anchorEl: PropTypes.any,
    onClose: PropTypes.func,
};

export default EmployeeContextMenu;
