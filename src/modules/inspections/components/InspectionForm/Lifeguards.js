import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Field, FieldArray } from "redux-form";

import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";

import CloseIcon from "@material-ui/icons/Close";

import SelectEmployeeModal from "modules/company/components/SelectEmployeeModal";

class LifeguardFieldArray extends Component {
    state = {
        openSelectEmployee: false,
    };

    openSelectEmployee = () => {
        this.setState({
            openSelectEmployee: true,
        });
    };

    closeSelectEmployee = () => {
        this.setState({
            openSelectEmployee: false,
        });
    };

    handleSelectEmployee = employees => {
        employees.forEach(employee => this.addEmployee(employee));
        this.closeSelectEmployee();
    };

    addEmployee = employee => {
        const { fields } = this.props;

        for (let i = 0; i < fields.length; i++) {
            if (fields.get(i).employee_id === employee.id) {
                return;
            }
        }

        fields.push({
            employee_id: employee.id,
            employee: {
                id: employee.id,
                display_name: employee.display_name,
            },
        });
    };

    render() {
        const {
            fields,
            meta: { error, submitFailed },
        } = this.props;
        const { openSelectEmployee } = this.state;
        return (
            <Fragment>
                <FormControl error={!!(submitFailed && error)} fullWidth={true}>
                    {fields.map((inspectionEmployee, index) => {
                        return (
                            <div key={index}>
                                <Field name={`${inspectionEmployee}.employee_id`} component="input" type="hidden" />
                                <Field name={`${inspectionEmployee}.employee.id`} component="input" type="hidden" />
                                <Field
                                    name={`${inspectionEmployee}.employee.display_name`}
                                    component={({ input /*, meta, ...props*/ }) => {
                                        return (
                                            <Input
                                                {...input}
                                                readOnly={true}
                                                fullWidth={true}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={() => fields.remove(index)}>
                                                            <CloseIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        );
                                    }}
                                />
                            </div>
                        );
                    })}
                    {submitFailed && error && <FormHelperText>{error}</FormHelperText>}
                </FormControl>
                <div>
                    <Button variant="contained" onClick={this.openSelectEmployee}>Add lifeguard</Button>
                </div>
                <SelectEmployeeModal
                    selectableEmployees={2}
                    isOpen={openSelectEmployee}
                    onSelect={this.handleSelectEmployee}
                    onClose={this.closeSelectEmployee}
                />
            </Fragment>
        );
    }
}

LifeguardFieldArray.propTypes = {
    fields: PropTypes.object,
};

class Lifeguards extends Component {
    render() {
        return (
            <div>
                <Typography variant="h5">Lifeguard(s)</Typography>
                <FieldArray name="inspectionEmployees" component={LifeguardFieldArray} />
            </div>
        );
    }
}

export default Lifeguards;
