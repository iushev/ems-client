import React, { useContext } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import withStyles from "@material-ui/core/styles/withStyles";

import Icon from "@material-ui/core/Icon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import BallotIcon from "@material-ui/icons/Ballot";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AppContext } from "AppContext";
import CheckAccess from "modules/auth/components/CheckAccess";

const drawerWidth = 240;

const styles = theme => ({
    nav: {
        flexGrow: 1,
        overflow: "auto",
    },
    drawerPaper: {
        width: drawerWidth,
        overflow: "hidden",
        [theme.breakpoints.up("md")]: {
            position: "relative",
        },
        backgroundColor: theme.palette.background.default,
        [theme.breakpoints.down("sm")]: {
            backgroundColor: theme.palette.background.paper,
        },
        zIndex: "auto",
    },
    drawerPaperAnchorDockedLeft: {
        borderRight: "none",
    },
    navLinkActive: {
        backgroundColor: theme.palette.action.hover,
    },
});

const Link = React.forwardRef((props, ref) => <NavLink innerRef={ref} {...props} />);

const Sidebar = ({ classes, theme, mobileOpen, onMobileClose }) => {
    const appContext = useContext(AppContext);

    const drawer = (
        <React.Fragment>
            <List component="nav">
                <ListItem button component={Link} to="/dashboard" activeClassName={classes.navLinkActive}>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <CheckAccess roles={["commerce:customer:list"]}>
                    <ListItem button component={Link} to="/customers" activeClassName={classes.navLinkActive}>
                        <ListItemIcon>
                            <Icon>
                                <FontAwesomeIcon icon="building" />
                            </Icon>
                        </ListItemIcon>
                        <ListItemText primary="Customers" />
                    </ListItem>
                </CheckAccess>
                <CheckAccess roles={["company:employee:list"]}>
                    <ListItem button component={Link} to="/employees" activeClassName={classes.navLinkActive}>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Employees" />
                    </ListItem>
                </CheckAccess>
                <CheckAccess roles={["inspections:inspection:list"]}>
                    <ListItem button component={Link} to="/inspections" activeClassName={classes.navLinkActive}>
                        <ListItemIcon>
                            <BallotIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inspections" />
                    </ListItem>
                </CheckAccess>
            </List>
            <Divider />
            {/* <List>
                <ListItem button>
                    <ListItemIcon>
                        <PieChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Reports" />
                </ListItem>
            </List> */}
            {/* <Divider /> */}
            <List>
                <ListItem button component={Link} to={appContext.signOutPath}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign Out" />
                </ListItem>
            </List>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <Hidden mdUp>
                <Drawer
                    variant="temporary"
                    anchor={theme.direction === "rtl" ? "right" : "left"}
                    open={mobileOpen}
                    onClose={onMobileClose}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden smDown>
                <Drawer
                    variant="permanent"
                    open
                    classes={{
                        paper: classes.drawerPaper,
                        paperAnchorDockedLeft: classes.drawerPaperAnchorDockedLeft,
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </React.Fragment>
    );
};

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    mobileOpen: PropTypes.bool.isRequired,
    onMobileClose: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
    mobileOpen: false,
};

export default withStyles(styles, { withTheme: true })(Sidebar);
