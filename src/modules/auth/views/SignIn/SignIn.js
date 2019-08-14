import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";

// imports from app
import { AppContext } from "AppContext";

// imports from module
import SignInForm from "modules/auth/components/SignInForm";
import { signInUser } from "modules/auth/store/actions";

const styles = theme => ({
    container: {
        margin: "0 auto",
        paddingTop: "4rem",
        maxWidth: "30rem",
        backgroundColor: theme.palette.background.default,
        [theme.breakpoints.down("sm")]: {
            width: "90%",
        },
    },
    cartHeader: {
        backgroundColor: theme.palette.primary.main,
    },
    cardTitle: {
        color: theme.palette.primary.contrastText,
    },
    signInButton: {
        marginTop: theme.spacing(2),
    },
    resetPasswordButton: {
        marginTop: theme.spacing(2),
    },
});

class SignIn extends Component {
    handleSubmit = ({ username, password, rememberMe }) => {
        return this.props.signInUser(username, password, rememberMe).then(response => {
            if (this.props.afterSignIn) {
                this.props.afterSignIn();
            }
            return response;
        });
    };

    render() {
        const { token, classes } = this.props;

        if (token) {
            const redirectPath = (this.props.location.state && this.props.location.state.from) || this.context.homePath;
            return <Redirect to={redirectPath} />;
        }

        return (
            <div className={classes.container}>
                <Card className={classes.card}>
                    <CardHeader
                        title="Sign In"
                        classes={{
                            root: classes.cartHeader,
                            title: classes.cardTitle,
                        }}
                    />
                    <CardContent>
                        <SignInForm formId="sign-in-form" onSubmit={this.handleSubmit} />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            className={classes.signInButton}
                            type="submit"
                            form="sign-in-form"
                        >
                            Sign In
                        </Button>
                        <Button
                            className={classes.resetPasswordButton}
                            component={Link}
                            to={this.context.resetPasswordPath}
                        >
                            Reset Password
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

SignIn.contextType = AppContext;

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
    token: PropTypes.string,
    signInUser: PropTypes.func.isRequired,
    afterSignIn: PropTypes.func.isRequired,
    // from withRouter
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

const matStateToProps = state => {
    return {
        token: state.auth.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signInUser: (username, password, rememberMe) => dispatch(signInUser(username, password, rememberMe)),
    };
};

export default withRouter(
    connect(
        matStateToProps,
        mapDispatchToProps
    )(withStyles(styles)(SignIn))
);
