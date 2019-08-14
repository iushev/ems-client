import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { DialogContentText } from "@material-ui/core";

const ConfirmDialog = ({ open, title, text, onClose, onConfirm, ...props }) => {
    return (
        <Dialog open={open} onClose={onClose} {...props}>
            <DialogTitle>{title || "Confirm"}</DialogTitle>
            <DialogContent>
                <DialogContentText>{text || "Are you sure?"}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onConfirm}>OK</Button>
                <Button onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

ConfirmDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

ConfirmDialog.defaultProps = {
    open: false,
    title: "Confirm",
    text: "Are you sure?",
};

export default ConfirmDialog;
