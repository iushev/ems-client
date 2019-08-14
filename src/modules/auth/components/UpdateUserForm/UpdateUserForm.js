import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Field, reduxForm, propTypes } from 'redux-form';

import TextField from 'modules/common/components/Form/TextField';
import Checkbox from 'modules/common/components/Form/Checkbox';
import FormError from 'modules/common/components/Form/FormError';
import withFormSubmit from 'modules/common/hoc/withFormSubmit';

export const formId = 'update-user-form';

class UpdateUserForm extends Component {
    render() {
        const { formId, error, handleSubmit/*, submitting*/, submitFailed } = this.props;
        return (
            <Form
                id={formId}
                method='post'
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(this.props.onSubmit)}
            >
                {submitFailed && error && <FormError error={error} />}
                <Field
                    name='username'
                    component={TextField}
                    label='Username'
                    required
                    fullWidth
                    margin='dense'
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Field
                    name='first_name'
                    component={TextField}
                    label='First Name'
                    fullWidth
                    margin='dense'
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Field
                    name='last_name'
                    component={TextField}
                    label='Last Name'
                    fullWidth
                    margin='dense'
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Field
                    name='email'
                    component={TextField}
                    label='Email'
                    fullWidth
                    margin='dense'
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Field
                    name='is_active'
                    component={Checkbox}
                    label='Active'
                />
                <Field
                    name='is_superuser'
                    component={Checkbox}
                    label='Super User'
                />
            </Form>
        );
    }
}

UpdateUserForm.propTypes = {
    formId: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    ...propTypes,
};

UpdateUserForm.defaultProps = {
    formId: formId,
};

export default reduxForm({
    form: formId,
    enableReinitialize: true,
})(withFormSubmit(UpdateUserForm));
