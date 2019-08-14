import React, { useRef } from "react";
import PropTypes from "prop-types";
import SignaturePad from "react-signature-canvas";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

const SignaturePadModal = ({ title, isOpen, onClose, onSign }) => {
    const signPadRef = useRef();

    function handleSign() {
        onSign(signPadRef.current.toDataURL());
    }

    function refCallback(dialogContentElement) {
        if (dialogContentElement) {
            const style = window.getComputedStyle
                ? getComputedStyle(dialogContentElement, null)
                : dialogContentElement.currentStyle;
            const canvasElement = signPadRef.current.getCanvas();
            canvasElement.width =
                dialogContentElement.clientWidth - parseInt(style.paddingLeft) - parseInt(style.paddingRight);
        }
    }

    return (
        <Dialog fullWidth open={isOpen} onClose={onClose} aria-labelledby="sign-modal-title">
            <DialogTitle id="sign-modal-title">{title}</DialogTitle>
            <DialogContent ref={refCallback}>
                <SignaturePad
                    ref={signPadRef}
                    canvasProps={{
                        height: 200,
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={onClose}>
                    Cancel
                </Button>
                <Button color="primary" variant="contained" onClick={handleSign}>
                    Sign
                </Button>
            </DialogActions>
        </Dialog>
    );
};

SignaturePadModal.propTypes = {
    title: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSign: PropTypes.func.isRequired,
};

SignaturePadModal.defaultProps = {
    isOpen: false,
};

export default SignaturePadModal;
