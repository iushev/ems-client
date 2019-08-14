import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, propTypes } from 'redux-form';

import { withStyles } from '@material-ui/core';

import withFormSubmit from 'modules/common/hoc/withFormSubmit';
import FormError from 'modules/common/components/Form/FormError';
import TextField from 'modules/common/components/Form/TextField';

const styles = (/*theme*/) => ({
    container: {},
});

class SignUpForm extends Component {
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
                {error && <FormError error={error} />}
                <Field
                    name='username'
                    component={TextField}
                    label='Username'
                    margin="normal"
                    fullWidth
                    required
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Field
                    name='password'
                    component={TextField}
                    label='Password'
                    type='password'
                    margin="normal"
                    fullWidth
                    required
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Field
                    name='password_confirm'
                    component={TextField}
                    label='Confirm Password'
                    type='password'
                    margin="normal"
                    fullWidth
                    required
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Field
                    name='first_name'
                    component={TextField}
                    label='First Name'
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Field
                    name='last_name'
                    component={TextField}
                    label='Last Name'
                    margin="normal"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </form>
        );
    }
}

SignUpForm.propTypes = {
    formId: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    ...propTypes,
};

SignUpForm.defaultProps = {
    formId: 'sign-up-form',
};

export default reduxForm({
    form: 'sign-up-form',
})(withStyles(styles)(withFormSubmit(SignUpForm)));
