import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import parse from 'url-parse';
import { getQueryParams } from '../../../common/utils';

import api from '../../../../api';

class Sync extends Component {
    state = {
        successfulSync: null,
        syncError: null,
    }

    constructor(props) {
        super(props);

        const query = getQueryParams(this.props.location.search);
        if (query['result']) {
            this.state.successfulSync = query['result'] === 'success';
        }
    }

    componentDidMount() {
        if (this.state.successfulSync === null) {
            const url = parse(window.location, true);

            url.query['result'] = 'success';
            const successUrl = encodeURIComponent(url.toString());

            url.query['result'] = 'error';
            const errorUrl = encodeURIComponent(url.toString());

            api.qbo.sync(successUrl, errorUrl);
        } else if (this.state.successfulSync === false) {
            api.qbo.syncError()
                .then((syncError) => {
                    this.setState({
                        syncError: syncError,
                    });
                });
        }
    }

    render() {
        return (
            <div>
                QBO Sync
                {this.state.successfulSync !== null ? (
                    this.state.successfulSync ? <p>Successful sync</p> : (
                        <React.Fragment>
                            <p>Error sync</p>
                            {this.state.syncError ? (
                                <React.Fragment>
                                    <p>{this.state.syncError.message}</p>
                                    <p>{this.state.syncError.stack}</p>
                                </React.Fragment>
                            ) : null}
                        </React.Fragment>
                    )
                ) : null}
            </div>
        );
    }
}

Sync.propTypes = {

};

export default Sync;