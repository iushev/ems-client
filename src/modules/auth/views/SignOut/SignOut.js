import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

// imports from app
import { AppContext } from "AppContext";

// imports from 'core' module
import { setFlash } from "modules/common/components/FlashMessage/store/actions";

// imports from this module
import { signOutUser } from "modules/auth/store/actions";

const styles = (/* theme */) => ({
    container: {
        width: "100%",
        height: "100%",
    },
    wrapper: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
    progress: {
        display: "block",
        margin: "0 auto",
    },
});

class SignOut extends Component {
    componentDidMount() {
        if (this.props.token) {
            this.props.signOutUser().catch(error => this.props.setFlash("error", error.response.statusText));
        }
    }

    render() {
        const { classes, token } = this.props;

        if (!token) {
            return <Redirect to={this.context.homePath} />;
        }

        return (
            <div className={classes.container}>
                <div className={classes.wrapper}>
                    <CircularProgress className={classes.progress} size={50} />
                    <Typography>Signing Out</Typography>
                </div>
            </div>
        );
    }
}

SignOut.contextType = AppContext;

SignOut.propTypes = {
    token: PropTypes.string,
    signOutUser: PropTypes.func.isRequired,
    setFlash: PropTypes.func.isRequired,
    classes: PropTypes.object,
};

const mapStateToProps = state => {
    return {
        token: state.auth.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signOutUser: () => dispatch(signOutUser()),
        setFlash: (key, value) => dispatch(setFlash(key, value)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SignOut));
