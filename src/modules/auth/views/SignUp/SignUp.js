import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

import { SignUpForm } from 'modules/auth';
import { Toolbar, Button } from '@material-ui/core';
import api from 'api';

const styles = (theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(),
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        [theme.breakpoints.down('sm')]: {
            margin: 0,
        },
    },
    content: {
        flexGrow: 1,
        overflow: 'auto',
    },
    toolbar: {
        backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
    },
});

class SignUp extends Component {
    handleSubmit = (values) => {
        return api.auth.sign_up(values);
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                <CardContent className={classes.content}>
                    <Typography variant='h6'>Sign Up</Typography>
                    <SignUpForm
                        formId='sign-up-form'
                        onSubmit={this.handleSubmit}
                    />
                </CardContent>
                <Toolbar
                    className={classes.toolbar}
                >
                    <Button
                        type="submit"
                        color="primary"
                        variant='contained'
                        form='sign-up-form'
                    >
                        Sign Up
                    </Button>
                </Toolbar>
            </Paper>
        );
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);