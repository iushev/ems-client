import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import CreateUserForm, { formId as createUserFormId } from 'modules/auth/components/CreateUserForm';
import api from 'api';

class CreateUserDialog extends Component {
    state = {
        user: {},
    };

    close = () => {
        this.setState({
            user: {},
        });
        this.props.onClose();
    }

    createUser = (values) => {
        return api.auth.user.create(values)
            .then((user) => {
                this.props.onCreateUser(user);
                return user;
            });
    }

    render() {
        const { open } = this.props;
        return (
            <Dialog
                open={open}
                onClose={this.close}
                aria-labelledby='create-user-dialog-title'
            >
                <DialogTitle id='create-user-dialog-title'>Create User</DialogTitle>
                <DialogContent>
                    <CreateUserForm
                        onSubmit={this.createUser}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.close} variant='contained'>Cancel</Button>
                    <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        form={createUserFormId}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

CreateUserDialog.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onCreateUser: PropTypes.func,
};

CreateUserDialog.defaultProps = {
    open: false,
};

export default CreateUserDialog;