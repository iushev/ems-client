import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, propTypes } from 'redux-form';

import FormError from 'modules/common/components/Form/FormError';
import TextField from 'modules/common/components/Form/TextField';
import withFormSubmit from 'modules/common/hoc/withFormSubmit';

export const formId = 'set-password-form';

const SetPasswordForm = ({ formId, handleSubmit, submitFailed, error, onSubmit }) => (
    <form
        id={formId}
        method='post'
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
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


    </form>
);

SetPasswordForm.propTypes = {
    formId: PropTypes.string.isRequired,
    ...propTypes,
};

SetPasswordForm.defaultProps = {
    formId: formId,
};

export default reduxForm({
    form: formId,
})(withFormSubmit(SetPasswordForm));
