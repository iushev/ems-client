import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import EmployeeForm, { formId as employeeFormId } from 'modules/company/components/EmployeeForm';
import api from 'api';

class CreateEmployeeDialog extends Component {
    createEmployee = (values) => {
        return api.company.employee.create(values)
            .then((employee) => {
                this.props.onCreateEmployee(employee);
                return employee;
            });
    }

    render() {
        const { open } = this.props;
        return (
            <Dialog
                open={open}
                onClose={this.props.onClose}
                aria-labelledby='create-user-dialog-title'
                fullWidth={true}
                maxWidth="md"
            >
                <DialogTitle id='create-user-dialog-title'>Create Employee</DialogTitle>
                <DialogContent>
                    <EmployeeForm
                        onSubmit={this.createEmployee}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose} variant='contained'>Cancel</Button>
                    <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        form={employeeFormId}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

CreateEmployeeDialog.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onCreateEmployee: PropTypes.func,
};

CreateEmployeeDialog.defaultProps = {
    open: false,
};

export default CreateEmployeeDialog;