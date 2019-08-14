import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import get from 'lodash/get';
import classnames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
    inspectionLink: {
        color: theme.palette.primary.dark,
        textDecoration: 'none',
        display: 'inline-block',
        width: '100%',
    },
});

const LinkField = ({className, record = {}, source, classes, urlCreator, rowIndex = -1, ...props}) => {
    const value = get(record, source);
    return (
        <Link
            className={classnames(classes.inspectionLink, className)}
            to={urlCreator(record, source)}
            {...props}
        >
            {value && typeof value !== 'string' ? JSON.stringify(value) : value}
        </Link>
    );
};

LinkField.propTypes = {
    className: PropTypes.string,
    source: PropTypes.string.isRequired,
    record: PropTypes.object,
    rowIndex: PropTypes.number,
    label: PropTypes.string,

    classes: PropTypes.object,
    urlCreator: PropTypes.func,
};

export default withStyles(styles)(LinkField);
