import React, { useEffect, useContext, useState } from "react";
import { connect } from "react-redux";
import { isSubmitting } from "redux-form";
import moment from "moment";
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
import { UserContext } from "modules/auth/UserContext";
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

const CancelLink = React.forwardRef((props, ref) => <Link innerRef={ref} to="/inspections" {...props} />);

const InspectionCreate = ({ history, setFlash, isSubmitting }) => {
    debug("Render [InspectionCreate]");
    const classes = useStyles();
    const user = useContext(UserContext);
    const [inspector, setInspector] = useState(null);
    useEffect(() => {
        api.company.employee
            .findOne({
                where: {
                    user_id: user.id,
                },
            })
            .then(inspector => {
                setInspector(inspector);
            });
    }, [user.id]);

    const inspectionClass = "2018";

    function handleFormSubmit(data) {
        return api.inspections.inspection
            .create(data, inspectionClass)
            .then(inspection => {
                setFlash("success", "Inspection registred successfuly.");
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
                <InspectionForm
                    initialValues={{
                        inspected_by: (inspector && inspector.id) || null,
                        inspector: {
                            id: (inspector && inspector.id) || null,
                            display_name: (inspector && inspector.display_name) || null,
                        },
                        inspected_by_title: (inspector && inspector.title) || null,
                        date: moment(new Date()).format("YYYY-MM-DD"),
                        // inspectionProperties: {
                        //     owner_agent_signature_date: moment(new Date()).format("YYYY-MM-DD"),
                        // },
                    }}
                    onSubmit={handleFormSubmit}
                />
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
    roles: ["inspections:inspection:create"],
    noAccess: () => <NoAccess />,
})(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(InspectionCreate)
);
