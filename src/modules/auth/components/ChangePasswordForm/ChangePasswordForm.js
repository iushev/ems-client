import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, propTypes } from 'redux-form';

import withStyles from '@material-ui/core/styles/withStyles';

import FormError from 'modules/common/components/Form/FormError';
import TextField from 'modules/common/components/Form/TextField';
import withFormSubmit from 'modules/common/hoc/withFormSubmit';

const styles = (/*theme*/) => ({
    container: {},
});

class ChangePasswordForm extends Component {
    render() {
        const { formId, classes, handleSubmit, error, submitFailed } = this.props;

        return (
            <form
                id={formId}
                method='post'
                className={classes.container}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(this.props.onSubmit)}
            >
                {submitFailed && error && <FormError error={error} />}
                <Field
                    name='password'
                    component={TextField}
                    type="password"
                    label='Password'
                    margin='normal'
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Field
                    name='new_password'
                    component={TextField}
                    type="password"
                    label='New Password'
                    margin='normal'
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Field
                    name='new_password_confirm'
                    component={TextField}
                    type="password"
                    label='Confirm New Password'
                    margin='normal'
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </form>
        );
    }
}

ChangePasswordForm.propTypes = {
    formId: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    ...propTypes,
};

ChangePasswordForm.defaultProps = {
    formId: 'change-password-form',
};

export default reduxForm({
    form: 'change-password-form',
    enableReinitialize: true,
})(withFormSubmit(withStyles(styles)(ChangePasswordForm)));