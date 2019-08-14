import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withStyles } from '@material-ui/core/styles';
import { UserContext } from 'modules/auth/UserContext';
// import AccountCircleIcon from '@material-ui/icons/Co';

const styles = () => ({
    icon: {
        width: '1em',
    },
});

class SettingsMenu extends Component {
    state = {
        anchorEl: null,
    }

    handleMenu = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        // const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div {...this.props}>
                <IconButton
                    aria-owns={open ? 'settings-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                >
                    <FontAwesomeIcon icon='cog' />
                </IconButton>
                <Menu
                    id="settings-menu"
                    anchorEl={anchorEl}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                >
                    <MenuItem
                        component={Link}
                        to={'/auth/users'}
                        disabled={!this.context.can('auth:user:list')}
                    >
                        <ListItemIcon>
                            <FontAwesomeIcon icon='users' fixedWidth />
                        </ListItemIcon>
                        <ListItemText primary="User management" />
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

SettingsMenu.contextType = UserContext;

SettingsMenu.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(SettingsMenu);
