import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

import SetPassowrdForm, { formId as setPassowrdFormId } from 'modules/auth/components/SetPassowrdForm';

import api from 'api';


const styles = (/* theme */) => ({
    username: {
        fontWeight: 'bold',
    }
});

class SetPasswordDialog extends Component {
    state = {
        user: {},
    }

    close = () => {
        this.setState({
            user: {},
        }, this.props.onClose);
    }

    setPassword = (values) => {
        return api.auth.set_password(this.props.userId, values.password)
            .then(() => this.close());
    }

    fetchUser = () => {
        const { userId } = this.props;
        const { user } = this.state;
        if (userId && user && userId !== user.id) {
            return api.auth.user.get(userId)
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
        const { classes, open } = this.props;
        const { user } = this.state;

        return (
            <Dialog
                fullWidth
                maxWidth='sm'
                open={open}
                onClose={this.close}
                aria-labelledby='set-password-dialog-title'
            >
                <DialogTitle id='set-password-dialog-title'>Set Password</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Set new password for <span className={classes.username}>{user.username}</span>
                    </DialogContentText>
                    <SetPassowrdForm
                        onSubmit={this.setPassword}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.close} variant='contained'>Cancel</Button>
                    <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        form={setPassowrdFormId}
                    >
                        Set Password
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

SetPasswordDialog.propTypes = {
    classes: PropTypes.object,
    userId: PropTypes.number,
    open: PropTypes.bool,
    onClose: PropTypes.func,
};

SetPasswordDialog.defaultProps = {
    open: false,
};

export default withStyles(styles)(SetPasswordDialog);
