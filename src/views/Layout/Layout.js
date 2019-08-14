import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core';

import Sidebar from './Sidebar';
import AppBar from './AppBar';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    },
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative',
        },
    },
    content: {
        flexGrow: 1,
        overflow: 'hidden',
        backgroundColor: theme.palette.background.default,
        display: 'flex'
    },
    page: {
        flexGrow: 1,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
    },
}));

const Layout = ({ children }) => {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);

    function handleDrawerOpen() {
        setMobileOpen(true);
    }

    function handleDrawerClose() {
        setMobileOpen(false);
    }

    return (
        <React.Fragment>
            <AppBar
                onMobileOpen={handleDrawerOpen}
            />
            <main className={classes.content}>
                <Sidebar
                    mobileOpen={mobileOpen}
                    onMobileClose={handleDrawerClose}
                />
                <div className={classes.page}>
                    {children}
                </div>
            </main>
        </React.Fragment>
    );
};

export default Layout;