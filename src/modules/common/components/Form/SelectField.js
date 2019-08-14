import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from "@material-ui/core"

import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
    input: {
        cursor: "pointer",
    }
});

class SelectField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openSelectModal: false,
            displayValue: null,
        }
    }

    openSelectModal = () => {
        this.setState({
            openSelectModal: true,
        });
    }

    closeSelectModal = () => {
        this.setState({
            openSelectModal: false,
        });
    }

    handleSelect = (data) => {
        if (this.props.onSelect) {
            this.props.onSelect(data[0]);
        } else {
            this.setState({
                data: data[0],
            });
        }
        this.closeSelectModal();
    }

    render() {
        const {
            classes,
            id,
            label,
            input,
            meta: { touched, error },
            selectComponent: SelectComponent,
            onSelect, // eslint-disable-line no-unused-vars

            className,
            InputLabelProps,
            FormHelperTextProps,
            ...props
        } = this.props;

        const { openSelectModal } = this.state;
        const _id = id || uuid();
        const helperTextId = `${_id}-helper-text`;

        return (
            <div>
                <FormControl
                    aria-describedby={helperTextId}
                    className={className}
                    error={!!(touched && error)}
                    {...props}
                >
                    {label && (
                        <InputLabel
                            htmlFor={_id}
                            {...InputLabelProps}
                        >
                            {label}
                        </InputLabel>
                    )}
                    <Input
                        id={_id}
                        {...input}
                        onClick={this.openSelectModal}
                        classes={{
                            input: classes.input
                        }}
                        readOnly={true}
                        endAdornment={(
                            <InputAdornment position="end">
                                <IconButton>
                                    <SearchIcon
                                        fontSize="small"
                                    />
                                </IconButton>
                            </InputAdornment>
                        )}
                    />
                    {touched && error && (
                        <FormHelperText
                            id={helperTextId}
                            {...FormHelperTextProps}
                        >
                            { error.join('<br />') }
                        </FormHelperText>
                    )}
                </FormControl>
                <SelectComponent
                    isOpen={openSelectModal}
                    onSelect={this.handleSelect}
                    onClose={this.closeSelectModal}
                />
            </div>
        );
    }
}

SelectField.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    selectComponent: PropTypes.any,
    onSelect: PropTypes.func,
};

export default withStyles(styles)(SelectField);
