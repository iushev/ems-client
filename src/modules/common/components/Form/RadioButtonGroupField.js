import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

class RadioButtonGroupField extends Component {
    render() {
        const {
            input,
            label,
            meta: { touched, error },
            margin,
            fullWidth,
            children,
            ...custom
        } = this.props;

        return (
            <FormControl
                error={!!(touched && error)}
                margin={margin}
                fullWidth={fullWidth}
            >
                { label && <InputLabel shrink>{label}</InputLabel> }
                <RadioGroup
                    {...input}
                    {...custom}
                    value={input.value}
                    onChange={(event, value) => input.onChange(value)}
                >
                    {children}
                </RadioGroup>
                { touched && error &&
                    <FormHelperText>
                        {error.join('<br />')}
                    </FormHelperText>
                }
            </FormControl>
        );
    }
}

RadioButtonGroupField.propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    meta: PropTypes.shape({
        touched: PropTypes.bool,
        error: PropTypes.array,
    }),
    margin: PropTypes.string,
    fullWidth: PropTypes.bool,
    children: PropTypes.any,
};

RadioButtonGroupField.defaultProps = {
    margin: 'none',
};

export default RadioButtonGroupField;
