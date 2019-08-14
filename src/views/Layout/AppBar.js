import React from "react";

import { makeStyles } from "@material-ui/core";
import MuiAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import MenuIcon from '@material-ui/icons/Menu';
import SettingsMenu from "./SettingsMenu";

const useStyles = makeStyles(theme => ({
    appBar: {
        flexShrink: 0,
        zIndex: 1,
    },
    appBarTitle: {
        flexGrow: 1,
    },
    navIconHide: {
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
    // toolbar: theme.mixins.toolbar,
}));

const AppBar = ({ onMobileOpen, ...props }) => {
    const classes = useStyles();
    return (
        <MuiAppBar className={classes.appBar} position="static">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onMobileOpen}
                    className={classes.navIconHide}
                >
                    <MenuIcon />
                </IconButton>
                <Typography className={classes.appBarTitle} variant="h6" color="inherit" noWrap>
                    Aris EMS - Millennium Pool Management
                </Typography>
                <SettingsMenu />
            </Toolbar>
        </MuiAppBar>
    );
};

export default AppBar;
