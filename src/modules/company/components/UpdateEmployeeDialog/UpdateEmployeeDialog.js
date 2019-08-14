import React, { Component } from "react";
import PropTypes from "prop-types";

import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import EmployeeForm, { formId as employeeFormId } from "modules/company/components/EmployeeForm";
import api from "api";

class UpdateEmployeeDialog extends Component {
    state = {
        employee: {},
    };

    close = () => {
        this.setState({
            employee: {},
        });
        this.props.onClose();
    };

    updateEmployee = values => {
        const { employeeId } = this.props;
        return api.company.employee.update(employeeId, values).then(employee => {
            this.props.onUpdateEmployee(employee);
            return employee;
        });
    };

    fetchEmployee = () => {
        const { employeeId } = this.props;
        const { employee } = this.state;
        if (employeeId && employee && employeeId !== employee.id) {
            api.company.employee
                .get(employeeId, {
                    include: ["primaryAddr"],
                })
                .then(data => {
                    this.setState({
                        employee: data,
                    });
                });
        }
    };

    componentDidMount() {
        this.fetchEmployee();
    }

    componentDidUpdate() {
        this.fetchEmployee();
    }

    render() {
        const { open } = this.props;
        const { employee } = this.state;
        return (
            <Dialog
                open={open}
                onClose={this.close}
                aria-labelledby="update-employee-dialog-title"
                fullWidth={true}
                maxWidth="md"
            >
                <DialogTitle id="update-employee-dialog-title">Employee Information</DialogTitle>
                <DialogContent>
                    <EmployeeForm onSubmit={this.updateEmployee} initialValues={employee} />
                    {/* <EmployeeUserForm /> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.close} variant="contained">
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" type="submit" form={employeeFormId}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

UpdateEmployeeDialog.propTypes = {
    employeeId: PropTypes.number,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onCreateEmployee: PropTypes.func,
};

UpdateEmployeeDialog.defaultProps = {
    open: false,
};

export default UpdateEmployeeDialog;
