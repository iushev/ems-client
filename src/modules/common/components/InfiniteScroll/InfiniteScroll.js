/*
    InfiniteScroll/InfiniteScroll.js
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InfiniteScroll extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ]).isRequired,
        loadMore: PropTypes.func,
        hasMore: PropTypes.bool,
        errorLoading: PropTypes.bool,
        ref: PropTypes.func,
        threshold: PropTypes.number,
        onScroll: PropTypes.func,
        style: PropTypes.object,
    };

    static defaultProps = {
        hasMore: false,
        errorLoading: false,
        ref: null,
        threshold: 250,
        onScroll: () => ({}),
    };

    hasMore = true;

    load = () => {
        return this.props.loadMore()
            .then((response) => {
                const { hasMore, errorLoading} = this.props;
                if (!hasMore || errorLoading || !this.scrollComponent) {
                    return response;
                }
                let scrollTop = this.scrollComponent.scrollTop || document.body.scrollTop;
                let scrollHeight = this.scrollComponent.scrollHeight || document.body.scrollHeight;
                let clientHeight = this.scrollComponent.clientHeight || window.innerHeight;
                let scrolledToBottom = Math.ceil(scrollTop + clientHeight + this.props.threshold) >= scrollHeight;
                if (scrolledToBottom) {
                    return this.load();
                }
            });
    }

    componentDidMount() {
        this.load();
        this.attachScrollHandler();
    }

    componentWillUnmount() {
        this.dettachScrollHandler();
    }

    attachScrollHandler = () => {
        this.scrollComponent.addEventListener(
            'scroll',
            this.scrollHandler
        );
    }

    dettachScrollHandler = () => {
        this.scrollComponent.removeEventListener(
            'scroll',
            this.scrollHandler
        );
    }

    scrollHandler = (event) => {
        let scrollTop = event.target.scrollTop || document.body.scrollTop;
        let scrollLeft = event.target.scrollLeft || document.body.scrollLeft;

        this.props.onScroll({
            scrollTop,
            scrollLeft,
        });

        if (!this.props.hasMore) {
            return;
        }

        let scrollHeight = event.target.scrollHeight || document.body.scrollHeight;
        let clientHeight = event.target.clientHeight || window.innerHeight;
        let scrolledToBottom = Math.ceil(scrollTop + clientHeight + this.props.threshold) >= scrollHeight;

        if (scrolledToBottom) {
            this.props.loadMore();
        }
    }

    render() {
        const {
            children,
            loadMore, // eslint-disable-line no-unused-vars
            hasMore, // eslint-disable-line no-unused-vars
            errorLoading, // eslint-disable-line no-unused-vars
            ref,
            style,
            ...props
        } = this.props;

        return (
            <div
                ref={(infScroll) => {
                    this.scrollComponent = infScroll;
                    if (ref) {
                        ref(infScroll);
                    }
                }}
                style = {{
                    overflow: 'auto',
                    ...style,
                }}
                {...props}
            >
                {children}
            </div>
        );
    }
}

export default InfiniteScroll;
