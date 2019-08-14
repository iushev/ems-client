import React from 'react';
import PropTypes from 'prop-types';

import MDTextField from '@material-ui/core/TextField';

const TextField = ({
    label,
    input,
    meta: { touched, error },
    ...custom
}) => (
    <MDTextField
        label={label}
        error={!!(touched && error)}
        helperText={touched && error && (
            error.map((err, index) => (<span style={{display: 'block'}} key={index}>{err}</span>))
        )}
        {...input}
        {...custom}
    />
);

TextField.propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    meta: PropTypes.shape({
        touched: PropTypes.bool,
        error: PropTypes.array,
    }),
};

export default TextField;
