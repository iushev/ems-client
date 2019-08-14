import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import withStyles  from '@material-ui/core/styles/withStyles';

import ChangePasswordForm from 'modules/auth/components/ChangePasswordForm';
import { setFlash } from 'modules/common/components/FlashMessage/store/actions';
import api from 'api';
import checkAccess from 'modules/auth/hoc/checkAccess';
import NoAccess from 'modules/auth/components/NoAccess';

const styles = theme => ({
    container: {
        margin: '0 auto',
        paddingTop: '4rem',
        maxWidth: '30rem',
        backgroundColor: theme.palette.background.default,
        [theme.breakpoints.down('sm')]: {
            width: '90%',
        },
    },
    cartHeader: {
        backgroundColor: theme.palette.primary.main,
    },
    cardTitle: {
        color: theme.palette.primary.contrastText,
    },
    changePasswordButton: {
        marginTop: theme.spacing(2),
    },
});

class ChangePassword extends Component {
    handleSubmit = ({ password, new_password, new_password_confirm }) => {
        return api.auth.change_password(password, new_password, new_password_confirm)
            .then(() => {
                this.props.setFlash('success', 'Password have changed successfully.');
                this.props.history.push((this.props.location.state && this.props.location.state.returnPath) || '/');
            })
            .catch((error) => {
                if (error.response && error.response.status !== 422) {
                    return this.props.setFlash('error', error.message);
                }
                throw error;
            });
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.container}>
                <Card className={classes.card}>
                    <CardHeader
                        title='Change password'
                        classes={{
                            root: classes.cartHeader,
                            title: classes.cardTitle,
                        }}
                    />
                    <CardContent>
                        <ChangePasswordForm
                            onSubmit={this.handleSubmit}
                        />
                        <Button
                            variant='contained'
                            color='primary'
                            fullWidth
                            size='large'
                            className={classes.changePasswordButton}
                            type='submit'
                            form='change-password-form'
                        >
                            Change Password
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

ChangePassword.propTypes = {
    classes: PropTypes.object.isRequired,
    setFlash: PropTypes.func,
    ...withRouter.propTypes,
};

const mapDispatchToProps = (dispatch) => {
    return {
        setFlash: (key, value) => dispatch(setFlash(key, value)),
    };
};

export default checkAccess({
    roles: ['@'],
    noAccess: () => (<NoAccess/>)
})(connect(undefined, mapDispatchToProps)(withRouter(withStyles(styles)(ChangePassword))));
