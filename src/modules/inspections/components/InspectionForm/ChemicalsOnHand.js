import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import withStyles from '@material-ui/core/styles/withStyles';

import TextField from '../../../common/components/Form/TextField';
import RadioButtonGroupField from '../../../common/components/Form/RadioButtonGroupField';

const styles = (theme) => ({
    quantity: {
        paddingRight: theme.spacing(),
    },
});

class ChemicalsOnHand extends Component {
    delivery_needed = [
        {text: 'Yes', value: 'yes'},
        {text: 'No', value: 'no'},
    ];

    deliveryNeeded = (name) => (
        <React.Fragment>
            <Typography component='span'>
                Delivery needed?
            </Typography>
            <Field
                name={name}
                component={RadioButtonGroupField}
                row={true}
            >
                { this.delivery_needed.map((item, index) => (
                    <FormControlLabel key={index} value={item.value} control={<Radio />} label={item.text} />
                ))}
            </Field>
        </React.Fragment>
    );

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Typography variant='h5'>Chemicals on hand:</Typography>
                <Grid container>
                    <Grid item xs={6} className={classes.quantity}>
                        <Field
                            label='Chlorine [gal]'
                            name='inspectionProperties.chlorine'
                            component={TextField}
                            fullWidth
                            margin='dense'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">gal</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        { this.deliveryNeeded('inspectionProperties.chlorine_delivery_needed') }
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={6} className={classes.quantity}>
                        <Field
                            label='Muriatic Acid [gal]'
                            name='inspectionProperties.muriatic_acid'
                            component={TextField}
                            fullWidth
                            margin='dense'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">gal</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        { this.deliveryNeeded('inspectionProperties.muriatic_acid_delivery_needed') }
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={6} className={classes.quantity}>
                        <Field
                            label='Cyanuric Acid (Stabilizer) [lb]'
                            name='inspectionProperties.cyanuric_acid'
                            component={TextField}
                            fullWidth
                            margin='dense'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">lb</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        { this.deliveryNeeded('inspectionProperties.cyanuric_acid_delivery_needed') }
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={6} className={classes.quantity}>
                        <Field
                            label='Sodium Bicarbonate (Alkalinity Up) [lb]'
                            name='inspectionProperties.sodium_bicarbonate'
                            component={TextField}
                            fullWidth
                            margin='dense'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">lb</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        { this.deliveryNeeded('inspectionProperties.sodium_bicarbonate_delivery_needed') }
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={6} className={classes.quantity}>
                        <Field
                            label='Calcium Chloride (Calcium Hardness Up) [lb]'
                            name='inspectionProperties.calcium_chloride'
                            component={TextField}
                            fullWidth
                            margin='dense'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">lb</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        { this.deliveryNeeded('inspectionProperties.calcium_chloride_delivery_needed') }
                    </Grid>
                </Grid>
            </div>
        );
    }
}

ChemicalsOnHand.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(ChemicalsOnHand);