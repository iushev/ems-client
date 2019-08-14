import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
    root: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 1,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backdrop: {
        position: 'absolute',
    },
    container: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        outline: 'none',
        display: 'flex',
        alignItems: 'center',
    },
    circular: {
        marginRight: theme.spacing(2),
    },
    description: {

    },
});

const Waiting = ({ open, classes }) => {
    if (!open) {
        return null;
    }

    return (
        <div className={classes.root}>
            <Backdrop open className={classes.backdrop} />
            <Paper className={classes.container}>
                <CircularProgress className={classes.circular}/>
                <Typography className={classes.description}>Pleace wait ...</Typography>
            </Paper>
        </div>
    );
};

Waiting.propTypes = {
    open: PropTypes.bool,
    classes: PropTypes.object,
};

export default withStyles(styles)(Waiting);