import React from "react";
import { Route, Switch } from "react-router-dom";

import InspectionCreate from "modules/inspections/views/InspectionCreate";
import InspectionUpdate from "modules/inspections/views/InspectionUpdate";
import InspectionList from "modules/inspections/views/InspectionList";
import Layout from "./Layout";

const debug = require("debug")("ems");

const Inspections = ({ match: { path } }) => {
    debug("Render [Inspections]");
    return (
        <Layout>
            <Switch>
                <Route path={`${path}/create`} component={InspectionCreate} />
                <Route path={`${path}/:id`} component={InspectionUpdate} />
                <Route path={`${path}`} component={InspectionList} />
            </Switch>
        </Layout>
    );
};

export default Inspections;
