import React from "react";
import PropTypes from "prop-types";
import { Form, Field, reduxForm, propTypes } from "redux-form";

import Grid from "@material-ui/core/Grid";
// import { DatePicker } from "material-ui-pickers";

import TextField from "modules/common/components/Form/TextField";
// import Checkbox from "modules/core/components/Form/Checkbox";
import FormError from "modules/common/components/Form/FormError";
import withFormSubmit from "modules/common/hoc/withFormSubmit";

export const formId = "employee-form";

const EmployeeForm = ({ formId, error, handleSubmit /*, submitting*/, submitFailed, onSubmit }) => {
    return (
        <Form id={formId} method="post" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            {submitFailed && error && <FormError error={error} />}
            <Grid container spacing={1}>
                <Grid container item spacing={1} xs={6}>
                    <Grid item xs={2}>
                        <Field
                            name="title"
                            component={TextField}
                            label="Title"
                            fullWidth
                            margin="none"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <Field
                            name="given_name"
                            component={TextField}
                            label="First Name"
                            fullWidth
                            margin="none"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <Field
                            name="family_name"
                            component={TextField}
                            label="Last Name"
                            fullWidth
                            margin="none"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            name="display_name"
                            component={TextField}
                            label="Display Name"
                            fullWidth
                            margin="none"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            name="primaryAddr.line_1"
                            component={TextField}
                            label="Address"
                            fullWidth
                            margin="none"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Line 1"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            name="primaryAddr.line_2"
                            component={TextField}
                            fullWidth
                            margin="none"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Line 2"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Field
                            name="primaryAddr.city"
                            component={TextField}
                            fullWidth
                            margin="none"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="City / Town"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Field
                            name="primaryAddr.region"
                            component={TextField}
                            fullWidth
                            margin="none"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="State / Province"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Field
                            name="primaryAddr.postal_code"
                            component={TextField}
                            fullWidth
                            margin="none"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="ZIP code"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Field
                            name="primaryAddr.country_id"
                            component={TextField}
                            fullWidth
                            margin="none"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Country"
                        />
                    </Grid>
                </Grid>
                <Grid container item spacing={1} xs={6} alignContent="flex-start">
                    <Grid item xs={12}>
                        <Field
                            name="primary_email_addr"
                            component={TextField}
                            label="Email"
                            fullWidth
                            margin="none"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Field
                            name="primary_phone"
                            component={TextField}
                            label="Phone"
                            fullWidth
                            margin="none"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Field
                            name="mobile"
                            component={TextField}
                            label="Mobile"
                            fullWidth
                            margin="none"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Field
                            name="employee_number"
                            component={TextField}
                            label="Employee number"
                            fullWidth
                            margin="none"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        {/* <Field
                            name="birth_date"
                            component={({ input, meta: { touched, error }, label, displayFormat, ...custom }) => (
                                <DatePicker
                                    label={label}
                                    inputProps={input}
                                    error={!!(touched && error)}
                                    helperText={touched && error && error.join("<br />")}
                                    {...custom}
                                    format={displayFormat}
                                    disableFuture
                                    openTo="year"
                                    views={["year", "month", "date"]}
                                    value={input.value}
                                    onChange={value => {
                                        return input.onChange(value.format("YYYY-MM-DD"));
                                    }}
                                />
                            )}
                            displayFormat='MMMM Do YYYY'
                            invalidLabel=''
                            label="Birth Date"
                            fullWidth
                            margin="none"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        /> */}
                    </Grid>
                    <Grid item xs={6}>
                        {/* <Field
                            name="hired_date"
                            component={({ input, meta: { touched, error }, label, displayFormat, ...custom }) => (
                                <DatePicker
                                    label={label}
                                    inputProps={input}
                                    error={!!(touched && error)}
                                    helperText={touched && error && error.join("<br />")}
                                    {...custom}
                                    format={displayFormat}
                                    value={input.value}
                                    onChange={value => {
                                        return input.onChange(value.format("YYYY-MM-DD"));
                                    }}
                                />
                            )}
                            displayFormat='MMMM Do YYYY'
                            invalidLabel=''
                            label="Hired Date"
                            fullWidth
                            margin="none"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        /> */}
                    </Grid>
                    <Grid item xs={6}>
                        {/* <Field
                            name="released_date"
                            component={({ input, meta: { touched, error }, label, displayFormat, ...custom }) => (
                                <DatePicker
                                    label={label}
                                    inputProps={input}
                                    error={!!(touched && error)}
                                    helperText={touched && error && error.join("<br />")}
                                    {...custom}
                                    format={displayFormat}
                                    value={input.value}
                                    onChange={value => {
                                        return input.onChange(value.format("YYYY-MM-DD"));
                                    }}
                                />
                            )}
                            displayFormat='MMMM Do YYYY'
                            invalidLabel=''
                            label="Released"
                            fullWidth
                            margin="none"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        /> */}
                    </Grid>
                </Grid>
            </Grid>
        </Form>
    );
};

EmployeeForm.propTypes = {
    formId: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    ...propTypes,
};

EmployeeForm.defaultProps = {
    formId: formId,
};

export default reduxForm({
    form: formId,
    enableReinitialize: true,
})(withFormSubmit(EmployeeForm));
