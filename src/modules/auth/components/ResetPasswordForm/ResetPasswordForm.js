import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, propTypes } from 'redux-form';

import InputAdornment from '@material-ui/core/InputAdornment';
import withStyles from '@material-ui/core/styles/withStyles';

import EmailIcon from '@material-ui/icons/Email';

import FormError from 'modules/common/components/Form/FormError';
import TextField from 'modules/common/components/Form/TextField';
import withFormSubmit from 'modules/common/hoc/withFormSubmit';

const styles = (/* theme */) => ({
    container: {},
});

class ResetPasswordForm extends Component {
    render() {
        const { formId, classes, handleSubmit, error } = this.props;

        return (
            <form
                id={formId}
                method='post'
                className={classes.container}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(this.props.onSubmit)}
            >
                {error && <FormError error={error}/>}
                <div>
                    <Field
                        name='email'
                        component={TextField}
                        label="Email"
                        autoFocus
                        margin="normal"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment
                                    position="start"
                                >
                                    <EmailIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
            </form>
        );
    }
}

ResetPasswordForm.propTypes = {
    formId: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    ...propTypes,
};

ResetPasswordForm.defaultProps = {
    formId: 'reset-password-form',
};

export default reduxForm({
    form: 'reset-password-form',
})(withStyles(styles)(withFormSubmit(ResetPasswordForm)));
