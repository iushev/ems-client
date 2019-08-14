import React, { useContext, Fragment, useState } from "react";

import { makeStyles } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import red from "@material-ui/core/colors/red";

import { UserContext } from "modules/auth/UserContext";
import api from "api";
import { InspectionsContext } from "./InspectionsContext";
import ConfirmDialog from "modules/common/components/ConfirmDialog";

const useStyles = makeStyles(theme => ({
    danger: {
        color: red[500],
    },
}));

const InspectionContextMenu = ({ inspection, inspectionIndex, ...props }) => {
    const classes = useStyles();
    const userContext = useContext(UserContext);
    const inspections = useContext(InspectionsContext);
    const [ openConfirmDelete, setOpenConfirmDelete ] = useState(false);

    if (!inspection) {
        return null;
    }

    function deleteInspection() {
        setOpenConfirmDelete(true);
    }

    function cancelDelete() {
        setOpenConfirmDelete(false);
        props.onClose();
    }

    function confirmDelete() {
        api.inspections.inspection.delete(inspection.id).then(() => {
            setOpenConfirmDelete(false);
            inspections.remove(inspection.id);
            props.onClose();
        });
    }

    return (
        <Fragment>
            <Menu {...props}>
                <MenuItem
                    onClick={deleteInspection}
                    disabled={!userContext.can("inspections:inspection:delete")}
                    classes={{ root: classes.danger }}
                >
                    Delete
                </MenuItem>
            </Menu>
            <ConfirmDialog
                open={openConfirmDelete}
                onClose={cancelDelete}
                onConfirm={confirmDelete}
                maxWidth="xs"
                fullWidth
            />
        </Fragment>
    );
};

export default InspectionContextMenu;
