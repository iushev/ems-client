import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import RadioButtonGroupField from 'modules/common/components/Form/RadioButtonGroupField';

const styles = (/* theme */) => ({
    container: {

    }
});

class InspectionItemField extends Component {
    render() {
        const { label, name, options, classes } = this.props;
        return (
            <Grid container className={classes.container}>
                <Grid item xs={6}>
                    <Typography>{label}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Field
                        name={name}
                        component={RadioButtonGroupField}
                        row={true}
                    >
                        { options.map((rate, index) => (
                            <FormControlLabel key={index} value={rate.value} control={<Radio />} label={rate.text} />
                        ))}
                    </Field>
                </Grid>
            </Grid>
        );
    }
}

InspectionItemField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.array,
    classes: PropTypes.object,
};

export default withStyles(styles)(InspectionItemField);