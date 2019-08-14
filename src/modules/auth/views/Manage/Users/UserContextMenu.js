import React, { useState, useContext } from "react";
import PropTypes from "prop-types";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { UpdateUserDialog, SetPasswordDialog } from "modules/auth";
import { UserContext } from "modules/auth/UserContext";
import { UsersContext } from "./UsersContext";

const UserContextMenu = ({ user, userIndex, ...props }) => {
    const [isOpenUpdateUserDialog, setOpenUpdateUserDialog] = useState(false);
    const [isOpenSetPasswordDialog, setOpenSetPasswordDialog] = useState(false);
    const userContext = useContext(UserContext);
    const users = useContext(UsersContext);

    function openUpdateUserDialog() {
        setOpenUpdateUserDialog(true);
    }

    function closeUpdateUserDialog() {
        setOpenUpdateUserDialog(false);
        props.onClose();
    }

    function handleUpdateUser(user) {
        users.update(user, userIndex);
        closeUpdateUserDialog();
    }

    function openSetPasswordDialog() {
        setOpenSetPasswordDialog(true);
    }

    function closeSetPasswordDialog() {
        setOpenSetPasswordDialog(false);
        props.onClose();
    }

    return (
        <React.Fragment>
            <Menu {...props}>
                <MenuItem onClick={openUpdateUserDialog} disabled={!userContext.can("auth:user:update")}>
                    Edit
                </MenuItem>
                <MenuItem onClick={openSetPasswordDialog} disabled={!userContext.can("auth:set-password")}>
                    Set password
                </MenuItem>
            </Menu>
            <UpdateUserDialog
                userId={isOpenUpdateUserDialog ? user && user.id : null}
                open={isOpenUpdateUserDialog}
                onClose={closeUpdateUserDialog}
                onUpdateUser={handleUpdateUser}
            />
            <SetPasswordDialog
                userId={isOpenSetPasswordDialog ? user && user.id : null}
                open={isOpenSetPasswordDialog}
                onClose={closeSetPasswordDialog}
            />
        </React.Fragment>
    );
};

UserContextMenu.propTypes = {
    user: PropTypes.object,
    userIndex: PropTypes.number,
    open: PropTypes.bool,
    anchorEl: PropTypes.any,
    onClose: PropTypes.func,
};

export default UserContextMenu;
