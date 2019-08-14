import React, { useState } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import EmployeesTable from "modules/company/components/SelectEmployeeModal/EmployeesTable";

const useStyles = makeStyles({
    paperScrollPaper: {
        height: "calc(100% - 96px)",
    },
});

const SelectEmployeeModal = ({ selectableEmployees = 1, isOpen, onClose, onSelect }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const classes = useStyles();

    function handleSelect() {
        onSelect([...selectedRows]);
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="select-employee-modal-title"
            fullWidth
            classes={{
                paperScrollPaper: classes.paperScrollPaper,
            }}
        >
            <DialogTitle id="select-employee-modal-title">Select Employee</DialogTitle>
            <DialogContent>
                <EmployeesTable selectionChanged={setSelectedRows} selectableEmployees={selectableEmployees}/>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={onClose} aria-label={"Cancel"}>
                    Cancel
                </Button>
                <Button color="primary" variant="contained" onClick={handleSelect} aria-label={"OK"}>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

SelectEmployeeModal.propTypes = {
    onSelect: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
};

SelectEmployeeModal.defaultProps = {
    isOpen: false,
};

export default SelectEmployeeModal;
