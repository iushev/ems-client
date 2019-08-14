import React from "react";
import urlParse from "url-parse";
import axios from "axios";

const debug = require("debug")("ems");

const withList = options => WrappedComponent => {
    return class WithList extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                list: {
                    ids: [],
                    data: {},
                    error: null,
                    hasMore: true,
                    loading: false,
                    next: null,
                },
            };

            this.cancel = null;
        }

        componentDidMount() {
            debug(`[WithList.componentDidMount]: ${WrappedComponent.displayName}`);
        }

        componentWillUnmount() {
            debug(`[WithList.componentWillUnmount]: ${WrappedComponent.displayName}`);
            if (this.cancel) {
                console.log("Cancel fetch");
                this.cancel();
            }
        }

        add = item => {
            this.setState(prevState => ({
                list: {
                    ...prevState.list,
                    ids: [...prevState.list.ids, item.id],
                    data: {
                        ...prevState.list.data,
                        [item.id]: item,
                    },
                },
            }));
        };

        update = item => {
            this.setState(prevState => {
                return {
                    list: {
                        ...prevState.list,
                        data: {
                            ...prevState.list.data,
                            [item.id]: item,
                        },
                    },
                };
            });
        };

        remove = id => {
            this.setState(prevState => {
                const ids = [...prevState.list.ids];
                ids.splice(prevState.list.ids.indexOf(id), 1);
                const { [id]: item, ...data } = prevState.list.data;
                return {
                    list: {
                        ...prevState.list,
                        ids: ids,
                        data: data,
                    },
                };
            });
        };

        clear = () => {
            this.setState({
                list: {
                    ids: [],
                    data: {},
                    error: null,
                    hasMore: true,
                    loading: false,
                    next: null,
                },
            });
        };

        refresh = () => {
            this.clear();
            this.fetch();
        };

        fetch = () => {
            if (this.state.list.loading || !this.state.list.hasMore || this.state.list.error) {
                return Promise.resolve();
            }
            debug(`[WithList.fetch]: ${WrappedComponent.displayName}`);

            const params = {
                ...options.params,
                ...this.state.list.next,
            };
            this.setState(prevState => ({
                list: {
                    ...prevState.list,
                    loading: true,
                },
            }));
            return options
                .loadMore({
                    params: {
                        q: JSON.stringify(params),
                    },
                    cancelToken: new axios.CancelToken(cancel => {
                        this.cancel = cancel;
                    }),
                })
                .then(response => {
                    this.cancel = null;

                    const normalizedItems = response.results.reduce(
                        (normalizedItems, item) => {
                            normalizedItems.ids.push(item.id);
                            normalizedItems.data[item.id] = item;
                            return normalizedItems;
                        },
                        {
                            ids: [],
                            data: {},
                        }
                    );
                    this.setState(prevState => ({
                        list: {
                            ...prevState.list,
                            ids: [...prevState.list.ids, ...normalizedItems.ids],
                            data: {
                                ...prevState.list.data,
                                ...normalizedItems.data,
                            },
                            error: null,
                            hasMore: response.next !== null,
                            loading: false,
                            next: response.next ? JSON.parse(urlParse(response.next, true).query.q) : null,
                        },
                    }));
                    return response;
                })
                .catch(err => {
                    this.cancel = null;
                    if (!axios.isCancel(err)) {
                        this.setState(prevState => ({
                            list: {
                                ...prevState.list,
                                error: err,
                                loading: false,
                            },
                        }));
                    }
                    return err;
                });
        };

        render() {
            return (
                <WrappedComponent
                    list={{
                        ...this.state.list,
                        loadMore: this.fetch,
                        clear: this.clear,
                        add: this.add,
                        update: this.update,
                        remove: this.remove,
                        refresh: this.refresh,
                    }}
                    {...this.props}
                />
            );
        }
    };
};

export default withList;
