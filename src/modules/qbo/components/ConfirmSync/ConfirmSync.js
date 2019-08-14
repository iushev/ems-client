import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';


class ConfirmSync extends Component {
    handleCancel = () => {
        this.setState({ isOpen: false });
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }

    handleConfirm = () => {
        this.setState({ isOpen: false });
        if (this.props.onConfirm) {
            this.props.onConfirm();
        }
    }

    render() {
        const { isOpen } = this.props;
        return (
            <Dialog
                open={isOpen}
                onClose={this.handleCancel}
                aria-labelledby="confirm-sync-modal-title"
            >
                <DialogTitle id="confirm-sync-modal-modal-title">QuickBooks Sync</DialogTitle>
                <DialogContent>
                    Do you want to execute QuickBooks Sync?
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        onClick={this.handleCancel}
                        aria-label={'Cancel'}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        onClick={this.handleConfirm}
                        aria-label={'OK'}
                    >
                        Sync
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ConfirmSync.propTypes = {
    isOpen: PropTypes.bool,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
};

ConfirmSync.defaultProps = {
    isOpen: false,
};

export default ConfirmSync;