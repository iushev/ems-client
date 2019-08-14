import React, { useState } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import CustomersTable from "./CustomersTable";

const useStyles = makeStyles({
    paperScrollPaper: {
        height: "calc(100% - 96px)",
    },
});

const SelectCustomerModal = ({ isOpen, onClose, onSelect }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const classes = useStyles();

    function handleSelect() {
        onSelect([...selectedRows]);
    }

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="select-customer-modal-title"
            fullWidth
            classes={{
                paperScrollPaper: classes.paperScrollPaper,
            }}
        >
            <DialogTitle id="select-customer-modal-title">Select Pool</DialogTitle>
            <DialogContent>
                <CustomersTable selectionChanged={setSelectedRows} />
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

SelectCustomerModal.propTypes = {
    onSelect: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
};

SelectCustomerModal.defaultProps = {
    isOpen: false,
};

export default SelectCustomerModal;
