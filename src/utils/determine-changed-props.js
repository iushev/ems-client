import React, { Component } from "react";
import _ from "lodash";

export default function withPropsChecker(WrappedComponent) {
    return class PropsChecker extends Component {
        componentWillReceiveProps(nextProps) {
            Object.keys(nextProps)
                .filter(key => {
                    return !_.isEqual(nextProps[key], this.props[key]);
                })
                .map(key => {
                    console.log("changed property:", key, "from", this.props[key], "to", nextProps[key]);
                });
        }
        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
}
