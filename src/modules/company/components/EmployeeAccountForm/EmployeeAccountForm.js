import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Field, reduxForm, propTypes } from "redux-form";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import FormError from "modules/common/components/Form/FormError";
import TextField from "modules/common/components/Form/TextField";
import Checkbox from "modules/common/components/Form/Checkbox";
import withFormSubmit from "modules/common/hoc/withFormSubmit";

import api from "api";

export const formId = "employee-account-form";

const EmployeeAccountForm = ({
    createEmployeeAccount,
    formId,
    error,
    handleSubmit /*, submitting*/,
    submitFailed,
    onSubmit,
    ...props
}) => {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        api.auth.role.list().then(roles => {
            setRoles(roles.results);
        });
    }, []);

    return (
        <Form id={formId} method="post" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            {submitFailed && error && <FormError error={error} />}
            <Field
                name="username"
                component={TextField}
                label="Username"
                required
                fullWidth
                margin="dense"
                disabled={!createEmployeeAccount}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            {createEmployeeAccount ? (
                <Field
                    name="password"
                    component={TextField}
                    type="password"
                    label="Password"
                    required
                    fullWidth
                    margin="dense"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            ) : null}
            <Field
                name="role"
                component={({ input, meta, ...custom }) => {
                    return (
                        <FormControl margin="dense" fullWidth>
                            <InputLabel htmlFor={input.name} shrink>
                                Role
                            </InputLabel>
                            <Select inputProps={input} {...custom}>
                                <MenuItem value="" />
                                {roles.map(role => (
                                    <MenuItem key={role.name} value={role.name}>
                                        {role.description}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    );
                }}
            />
            <Field name="is_active" component={Checkbox} label="Active" />
        </Form>
    );
};

EmployeeAccountForm.propTypes = {
    formId: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    ...propTypes,
};

EmployeeAccountForm.defaultProps = {
    createEmployeeAccount: false,
    formId: formId,
};

export default reduxForm({
    form: formId,
    enableReinitialize: true,
})(withFormSubmit(EmployeeAccountForm));
