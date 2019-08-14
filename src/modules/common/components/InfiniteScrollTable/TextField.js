import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

const TextField = ({ value, source, content, record = {}, rowIndex = -1 }) => {
    const getValue = () => {
        if (value) {
            if (typeof value === 'string') {
                return get(record, value);
            }
            return value(record);
        } else if (source) {
            return get(record, source);
        }

        return null;
    };

    const renderContent = () => {
        if (content && typeof content === 'function') {
            return content(record, rowIndex);
        }
        const val = getValue();
        return val && typeof val !== 'string' ? JSON.stringify(val) : val;
    };

    return (
        <React.Fragment>
            {renderContent()}
        </React.Fragment>
    );
};

TextField.propTypes = {
    source: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
    ]),
    content: PropTypes.func,
    record: PropTypes.object,
    rowIndex: PropTypes.number,
    label: PropTypes.string,
};

export default TextField;