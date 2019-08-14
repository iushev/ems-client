import React, { useContext } from "react";
import { connect } from "react-redux";

import { AppContext } from "AppContext";
import { SignInView } from "modules/auth";
import { showConfirmSync } from "modules/qbo/store/actions";

const SignIn = ({ setShowConfirmQboSync, ...props }) => {
    const appContext = useContext(AppContext);

    function afterSignIn() {
        setShowConfirmQboSync(true);
    }

    return (
        <SignInView
            afterSignIn={afterSignIn}
            resetPasswordPath={appContext.resetPasswordPath}
            homePath={appContext.homePath}
            {...props}
        />
    );
};

const mapDispatchToProps = dispatch => {
    return {
        setShowConfirmQboSync: show => dispatch(showConfirmSync(show)),
    };
};

export default connect(
    undefined,
    mapDispatchToProps
)(SignIn);
