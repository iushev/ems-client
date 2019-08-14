import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import api from 'api';
import { AppContext } from 'AppContext';

import ResetPasswordForm from 'modules/auth/components/ResetPasswordForm';

const styles = theme => ({
    container: {
        margin: '0 auto',
        paddingTop: '4rem',
        maxWidth: '30rem',
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
    resetPasswordButton: {
        marginTop: theme.spacing(2),
    },
    signInButton: {
        marginTop: theme.spacing(2),
    },
});

class ResetPassword extends Component {
    handleSubmit = ({ email }) => {
        return api.auth.reset_password(email);
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.container}>
                <Card className={classes.card}>
                    <CardHeader
                        title='Reset Password'
                        classes={{
                            root: classes.cartHeader,
                            title: classes.cardTitle,
                        }}
                    />
                    <CardContent>
                        <ResetPasswordForm
                            formId='reset-password-form'
                            onSubmit={this.handleSubmit}
                        />
                        <Button
                            variant='contained'
                            color='primary'
                            fullWidth
                            size='large'
                            className={classes.resetPasswordButton}
                            type='submit'
                            form='reset-password-form'
                        >
                            Reset Password
                        </Button>
                        <Button
                            className={classes.signInButton}
                            component={Link}
                            to={this.context.signInPath}
                        >
                            Sign In
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

ResetPassword.contextType = AppContext;

ResetPassword.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResetPassword);