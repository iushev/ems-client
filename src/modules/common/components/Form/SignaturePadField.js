import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import withStyles from '@material-ui/core/styles/withStyles';

import SignaturePadModal from '../SignaturePadModal/SignaturePadModal';

import emptyImg from './emptyImg.png';

const styles = (/* theme */) => ({
    imageWrapper: {
        height: '48px',
        width: '100%',
        marginTop: '-16px',
    },
    image: {
        width: 'auto',
        height: '100%',
    },
});

class SignaturePadInput extends Component {
    state = {
        isOpen: false,
    }

    handleSign = (signature) => {
        this.props.onChange(signature);
        this.close();
    }

    close = () => {
        this.setState({
            isOpen: false,
        });
    }

    open = () => {
        this.setState({
            isOpen: true,
        });
    }

    render() {
        const { classes, inputRef, ...props } = this.props;
        const { isOpen } = this.state;

        return (
            <React.Fragment>
                <div
                    className={classes.imageWrapper}
                    onClick={this.open}
                >
                    <img
                        src={props.value ? props.value : emptyImg}
                        alt='Signature'
                        className={classes.image}
                    />
                </div>
                <SignaturePadModal
                    title='Signature'
                    isOpen={isOpen}
                    onSign={this.handleSign}
                    onClose={this.close}
                />
                <input
                    ref={this.inputRef}
                    {...props}
                    type='hidden'
                />
            </React.Fragment>
        );
    }
}

const SignaturePadInputStyled = withStyles(styles)(SignaturePadInput);

class SignaturePadField extends Component {
    render() {
        const { id, label, InputLabelProps, FormHelperTextProps, input, meta, ...props } = this.props;
        const _id = id || uuid();
        const helperTextId = `${_id}-helper-text`;
        return (
            <FormControl
                aria-describedby={helperTextId}
                error={!!(meta.touched && meta.error)}
                {...props}
            >
                { label && <InputLabel {...InputLabelProps}>{label}</InputLabel> }
                <Input
                    inputProps={input}
                    inputComponent={SignaturePadInputStyled}
                />
                {meta.touched && meta.error && (
                    <FormHelperText
                        id={helperTextId}
                        {...FormHelperTextProps}
                    >
                        { meta.error.join('<br />') }
                    </FormHelperText>
                )}
            </FormControl>
        );
    }
}

SignaturePadField.propTypes = {
    label: PropTypes.string,
    InputLabelProps: PropTypes.object,
    inputProps: PropTypes.object,
    classes: PropTypes.object,
};

export default SignaturePadField;