import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

import { DatePicker } from "@material-ui/pickers";

import TextField from "modules/common/components/Form/TextField";
import SignaturePadField from "modules/common/components/Form/SignaturePadField";

import InspectionItemField from "./InspectionItemField";

const styles = theme => ({
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
});

class OwnerSurvey extends Component {
    evaluation_rates = [
        { text: "Excellent", value: "excellent" },
        { text: "Good", value: "good" },
        { text: "Fair", value: "fair" },
        { text: "Poor", value: "poor" },
    ];

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Typography variant="h5">Owner/Agent Survey:</Typography>
                <InspectionItemField
                    name="inspectionProperties.pool_staff_performance"
                    label="Pool Staff Performance"
                    options={this.evaluation_rates}
                />
                <InspectionItemField
                    name="inspectionProperties.supervisor_performance"
                    label="Supervisor Performance"
                    options={this.evaluation_rates}
                />
                <InspectionItemField
                    name="inspectionProperties.overall_pool_operation"
                    label="Overall Pool Operation"
                    options={this.evaluation_rates}
                />
                <InspectionItemField
                    name="inspectionProperties.millennium_office_responsiveness"
                    label="Millennium Office Responsiveness"
                    options={this.evaluation_rates}
                />
                <Typography variant="subtitle1">
                    Thank you for your feedback! Please include any additional notes below:
                </Typography>
                <div className={classes.fieldsGroup}>
                    <Field
                        name="inspectionProperties.owner_agent_notes"
                        component={TextField}
                        label="Owner/Agent Notes:"
                        fullWidth
                        multiline
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <Grid container className={classes.fieldsGroup}>
                    <Grid item xs={6} className={classes.field}>
                        <Field
                            name="inspectionProperties.owner_agent_name"
                            component={TextField}
                            label="Owner/Agent Name"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={3} className={classes.field}>
                        <Field
                            name="inspectionProperties.owner_agent_title"
                            component={TextField}
                            label="Owner/Agent Title"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={3} className={classes.field}>
                        <Field
                            name="inspectionProperties.owner_agent_signature"
                            component={SignaturePadField}
                            label="Owner/Agent Signature"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.fieldsGroup}>
                    <Grid item xs={6} className={classes.field}>
                        <Field
                            name="inspectionProperties.owner_agent_signature_date"
                            component={TextField}
                            type="date"
                            label="Date"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        {/* <Field
                            name="inspectionProperties.owner_agent_signature_date"
                            component={({ input, meta: { touched, error }, ...custom }) => (
                                <DatePicker
                                    label="Date"
                                    error={!!(touched && error)}
                                    helperText={touched && error && error.join("<br />")}
                                    format="MMM Do YYYY"
                                    // invalidLabel=""
                                    {...input}
                                    {...custom}
                                    // value={input.value}
                                    // onChange={value => {
                                    //     return input.onChange(value.format("YYYY-MM-DD"));
                                    // }}
                                />
                            )}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        /> */}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

OwnerSurvey.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(OwnerSurvey);
