import React, { useContext, useState } from "react";
import moment from "moment";

import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/styles";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import InfiniteScrollTable from "modules/common/components/InfiniteScrollTable/InfiniteScrollTable";
import TextField from "modules/common/components/InfiniteScrollTable/TextField";

import { UsersContext } from "./UsersContext";
import UserContextMenu from "./UserContextMenu";

const useStyles = makeStyles(theme => ({
    buttonMore: {
        padding: theme.spacing(0.5),
    },
}));

const UsersTable = () => {
    const classes = useStyles();
    const users = useContext(UsersContext);
    const [currentUser, setCurrenctUser] = useState({
        user: null,
        index: -1,
    });
    const [userContextMenu, setUserContextMenu] = useState({
        open: false,
        anchorEl: null,
        props: {},
    });

    function openUserContextMenu(anchorEl, user, index, props = {}) {
        setCurrenctUser({
            user: user,
            index: index,
        });
        setUserContextMenu({
            open: true,
            anchorEl: anchorEl,
            props: props,
        });
    }

    function closeUserContextMenu() {
        setCurrenctUser({
            user: null,
            index: -1,
        });
        setUserContextMenu({
            open: false,
            anchorEl: null,
            props: {},
        });
    }

    return (
        <React.Fragment>
            <InfiniteScrollTable
                data={{
                    ids: users.ids,
                    records: users.data,
                }}
                loadMore={users.loadMore}
                hasMore={users.hasMore}
                errorLoading={users.error !== null}
            >
                <TextField label="Username" source="username" />
                <TextField label="First Name" source="first_name" />
                <TextField label="Last Name" source="last_name" />
                <TextField label="Email" source="email" />
                <TextField label="Created At" value={user => moment(user.created_at).format("lll")} />
                <TextField label="Last Login" value={user => moment(user.last_login).format("lll")} />
                <TextField label="Active" source="is_active" />
                <TextField
                    cellProps={{
                        style: {
                            width: "50px",
                            padding: 0,
                        },
                    }}
                    content={(user, index) => (
                        <IconButton
                            aria-label="More"
                            size="small"
                            className={classes.buttonMore}
                            onClick={event =>
                                openUserContextMenu(event.currentTarget, user, index, {
                                    getContentAnchorEl: null,
                                    anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "right",
                                    },
                                    transformOrigin: {
                                        vertical: "top",
                                        horizontal: "right",
                                    },
                                })
                            }
                        >
                            <MoreHorizIcon fontSize="small" />
                        </IconButton>
                    )}
                />
            </InfiniteScrollTable>
            <UserContextMenu
                user={currentUser.user}
                userIndex={currentUser.index}
                anchorEl={userContextMenu.anchorEl}
                open={userContextMenu.open}
                onClose={closeUserContextMenu}
                {...userContextMenu.props}
            />
        </React.Fragment>
    );
};

export default UsersTable;
