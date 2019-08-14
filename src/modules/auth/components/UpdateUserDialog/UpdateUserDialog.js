import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import UpdateUserForm, { formId as updateUserFormId } from 'modules/auth/components/UpdateUserForm';
import api from 'api';

class UpdateUserDialog extends Component {
    state = {
        user: {},
    }

    close = () => {
        this.setState({
            user: {},
        });
        this.props.onClose();
    }

    updateUser = (values) => {
        const { userId } = this.props;
        return api.auth.user.update(userId, values)
            .then((user) => {
                this.props.onUpdateUser(user);
                this.close();
                return user;
            });
    }

    fetchUser = () => {
        const { userId } = this.props;
        const { user } = this.state;
        if (userId && user && userId !== user.id) {
            api.auth.user.get(userId)
                .then((data) => {
                    this.setState({
                        user: data,
                    });
                });
        }
    }

    componentDidMount() {
        this.fetchUser();
    }

    componentDidUpdate() {
        this.fetchUser();
    }

    render() {
        const { open } = this.props;
        const { user } = this.state;
        return (
            <Dialog
                open={open}
                onClose={this.close}
                aria-labelledby='update-user-dialog-title'
            >
                <DialogTitle id='update-user-dialog-title'>Update User</DialogTitle>
                <DialogContent>
                    <UpdateUserForm
                        onSubmit={this.updateUser}
                        initialValues={user}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.close} variant='contained'>Cancel</Button>
                    <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        form={updateUserFormId}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

UpdateUserDialog.propTypes = {
    userId: PropTypes.number,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onUpdateUser: PropTypes.func,
};

UpdateUserDialog.defaultProps = {
    open: false,
};

export default UpdateUserDialog;
