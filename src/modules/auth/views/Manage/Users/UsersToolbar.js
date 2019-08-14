import React, { useState, useContext } from "react";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";

import CheckAccess from "modules/auth/components/CheckAccess";
import CreateUserDialog from "modules/auth/components/CreateUserDialog";
import { UsersContext } from "./UsersContext";

const useStyles = makeStyles(theme => ({
    spacer: {
        flexGrow: 1,
    },
    actions: {
        flexShrink: 1,
    },
    action: {
        marginRight: theme.spacing(),
    },
}));

const UsersToolbar = () => {
    const classes = useStyles();
    const [createUserOpen, setCreateUserOpen] = useState(false);
    const users = useContext(UsersContext);

    function openCreateUser() {
        setCreateUserOpen(true);
    }

    function closeCreateUser() {
        setCreateUserOpen(false);
    }

    function handleCreateUser(user) {
        users.add(user);
        closeCreateUser();
    }

    return (
        <Toolbar>
            <div className={classes.spacer}>
                <Typography variant="h4">Users</Typography>
            </div>
            <div className={classes.actions}>
                <CheckAccess roles={["auth:user:create"]}>
                    <Tooltip title="Invite user">
                        <span className={classes.action}>
                            <Button aria-label="Invite user" variant="contained" disabled>
                                Invite
                            </Button>
                        </span>
                    </Tooltip>
                    <Tooltip title="Add user">
                        <Button
                            aria-label="Add user"
                            variant="contained"
                            className={classes.action}
                            onClick={openCreateUser}
                        >
                            Create
                        </Button>
                    </Tooltip>
                </CheckAccess>
            </div>
            <CreateUserDialog open={createUserOpen} onClose={closeCreateUser} onCreateUser={handleCreateUser} />
        </Toolbar>
    );
};

export default UsersToolbar;
