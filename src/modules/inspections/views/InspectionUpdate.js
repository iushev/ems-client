import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { isSubmitting } from "redux-form";
import { Link } from 'react-router-dom';

import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import checkAccess from "modules/auth/hoc/checkAccess";
import NoAccess from "modules/auth/components/NoAccess";

import { setFlash } from "modules/common/components/FlashMessage/store/actions";
import InspectionForm, { formId as inspectionFormId } from "modules/inspections/components/InspectionForm";
import api from "api";
import Waiting from "modules/common/components/Waiting/Waiting";

const debug = require("debug")("ems");

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(),
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        [theme.breakpoints.down("sm")]: {
            margin: 0,
        },
    },
    content: {
        flexGrow: 1,
        overflow: "auto",
    },
    toolbar: {
        backgroundColor: theme.palette.type === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
        // marginTop: theme.spacing(2),
    },
    button: {
        marginRight: theme.spacing()
    }
}));

const inspectionClass = "2018";

const CancelLink = React.forwardRef((props, ref) => <Link innerRef={ref} to="/inspections" {...props} />);

const InspectionUpdate = ({
    setFlash,
    history,
    match: {
        params: { id: inspectionId },
    },
    isSubmitting,
}) => {
    debug("Render [InspectionList]");
    const classes = useStyles();
    const [inspection, setInspection] = useState(null);
    useEffect(() => {
        api.inspections.inspection.get(inspectionId, inspectionClass).then(setInspection);
    }, [inspectionId]);

    function handleFormSubmit(data) {
        return api.inspections.inspection
            .update(inspectionId, data, inspectionClass)
            .then(inspection => {
                setFlash("success", "Inspection updated successfully.");
                history.push("/inspections");
                return inspection;
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    setFlash("error", "Error. Please check fields");
                } else {
                    return setFlash("error", error.message);
                }
                throw error;
            });
    }

    return (
        <Paper className={classes.root} elevation={1}>
            <CardContent className={classes.content}>
                {inspection && <InspectionForm initialValues={inspection} onSubmit={handleFormSubmit} />}
            </CardContent>
            <Toolbar className={classes.toolbar}>
                <Button
                    className={classes.button}
                    disabled={isSubmitting}
                    type="submit"
                    color="primary"
                    variant="contained"
                    form={inspectionFormId}
                >
                    Save
                </Button>
                <Button
                    className={classes.button}
                    disabled={isSubmitting}
                    color="default"
                    variant="contained"
                    component={CancelLink}
                >
                    Cancel
                </Button>
            </Toolbar>
            <Waiting open={isSubmitting} />
        </Paper>
    );
};

const mapStateToProps = state => ({
    isSubmitting: isSubmitting(inspectionFormId)(state),
})

const mapDispatchToProps = dispatch => ({
    setFlash: (key, value) => dispatch(setFlash(key, value)),
});

export default checkAccess({
    roles: ["inspections:inspection:update"],
    noAccess: () => <NoAccess />,
})(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(InspectionUpdate)
);
