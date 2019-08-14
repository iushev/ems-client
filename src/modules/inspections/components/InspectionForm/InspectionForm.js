import React from "react";
import { Form, Field, reduxForm, SubmissionError } from "redux-form";

import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import TextField from "modules/common/components/Form/TextField";
import SelectField from "modules/common/components/Form/SelectField";
import SignaturePadField from "modules/common/components/Form/SignaturePadField";
import SelectCustomerModal from "modules/commerce/components/SelectCustomerModal";
import SelectEmployeeModal from "modules/company/components/SelectEmployeeModal";

import Lifeguards from "./Lifeguards";
import LifeguardPerformance from "./LifeguardPerformance";
import PoolFacilityChecklist from "./PoolFacilityChecklist";
import ChemicalsOnHand from "./ChemicalsOnHand";
import OwnerSurvey from "./OwnerSurvey";

export const formId = "inspection-form";

const debug = require("debug")("ems");

const useStyles = makeStyles(theme => ({
    container: {},
    fieldsGroup: {
        marginBottom: theme.spacing(),
    },
    field: {
        paddingRight: theme.spacing(),
        "&:last-child": {
            paddingRight: 0,
        },
    },
}));

const InspectionForm = ({ handleSubmit, onSubmit, change }) => {
    debug("Render [InspectionForm]");
    const classes = useStyles();

    function submitForm(data) {
        const res = onSubmit(data);
        if (!(!!res && (typeof res === "object" || typeof res === "function") && typeof res.then === "function")) {
            throw new Error("Return type should be Promise.");
        }

        return res.catch(error => {
            if (error.response && error.response.status === 422) {
                const errors = Object.keys(error.response.data).reduce((errors, fieldName) => {
                    switch (fieldName) {
                        case "non_field_errors":
                            errors["_error"] = error.response.data[fieldName];
                            break;
                        case "inspectionEmployees":
                            errors[fieldName] = {
                                _error: error.response.data[fieldName],
                            };
                            break;
                        case "object_id":
                            errors.object = {
                                display_name: error.response.data[fieldName]
                            };
                            break;
                        case "on_duty_id":
                            errors.on_duty = {
                                display_name: error.response.data[fieldName]
                            };
                            break;
                        default:
                            errors[fieldName] = error.response.data[fieldName];
                    }
                    return errors;
                }, {});
                throw new SubmissionError(errors);
            }
            return error;
        });
    }

    return (
        <Form id={formId} onSubmit={handleSubmit(submitForm)} noValidate autoComplete="off">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container className={classes.fieldsGroup}>
                        <Grid item xs={12} sm={7} className={classes.field}>
                            <Field name="object_id" component="input" type="hidden" />
                            <Field name="object.id" component="input" type="hidden" />
                            <Field
                                name="object.display_name"
                                component={SelectField}
                                id="inspection-form-object-id"
                                label="Pool Name"
                                required
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                selectComponent={SelectCustomerModal}
                                onSelect={data => {
                                    change("object_id", data.id);
                                    change("object.id", data.id);
                                    change("object.display_name", data.display_name);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5} className={classes.field}>
                            <Field
                                name="date"
                                component={TextField}
                                type="date"
                                label="Date"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container className={classes.fieldsGroup}>
                        <Grid item xs={9} sm={6} className={classes.field}>
                            <Field name="inspected_by" component="input" type="hidden" />
                            <Field
                                name="inspector.display_name"
                                component={TextField}
                                label="Inspected By"
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={3} className={classes.field}>
                            <Field
                                name="inspected_by_title"
                                component={TextField}
                                label="Title"
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} className={classes.field}>
                            <Field name="inspected_by_signature_id" component="input" type="hidden" />
                            <Field
                                name="inspectedBySignature.signature"
                                component={SignaturePadField}
                                label="Signature"
                                fullWidth
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container className={classes.fieldsGroup}>
                        <Grid item xs={12} sm={9} className={classes.field}>
                            <Field name="on_duty_id" component="input" type="hidden" />
                            <Field name="on_duty.id" component="input" type="hidden" />
                            <Field
                                name="on_duty.display_name"
                                component={SelectField}
                                type="hidden"
                                id="inspection-form-on-duty-id"
                                label="Pool Mgr On Duty"
                                required
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                selectComponent={SelectEmployeeModal}
                                onSelect={data => {
                                    change("on_duty_id", data.id);
                                    change("on_duty.id", data.id);
                                    change("on_duty.display_name", data.display_name);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3} className={classes.field}>
                            <Field name="on_duty_signature_id" component="input" type="hidden" />
                            <Field
                                name="onDutySignature.signature"
                                component={SignaturePadField}
                                label="Pool Mgr Signature"
                                fullWidth
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Lifeguards />
                </Grid>
                <Grid item xs={12}>
                    <LifeguardPerformance />
                </Grid>
                <Grid item xs={12}>
                    <PoolFacilityChecklist />
                </Grid>
                <Grid item xs={12}>
                    <ChemicalsOnHand />
                </Grid>
                <Grid item xs={12}>
                    <OwnerSurvey />
                </Grid>
            </Grid>
        </Form>
    );
};

export default reduxForm({
    form: formId,
    enableReinitialize: true,
})(InspectionForm);
