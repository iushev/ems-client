import React, { useContext } from 'react';

import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import InfiniteScrollTable from 'modules/common/components/InfiniteScrollTable/InfiniteScrollTable';
import TextField from 'modules/common/components/InfiniteScrollTable/TextField';

import { CustomersContext } from "./CustomersContext";

const useStyles = makeStyles(theme => ({
    buttonMore: {
        padding: theme.spacing(0.5),
    },
}));

const CustomersTable = () => {
    const classes = useStyles();
    const customers = useContext(CustomersContext);

    return (
        <InfiniteScrollTable
            data={{
                ids: customers.ids,
                records: customers.data,
            }}
            loadMore={customers.loadMore}
            hasMore={customers.hasMore}
            errorLoading={customers.error !== null}
        >
            <TextField label='Customer' source='display_name' />
            <TextField label='Phone' source='primary_phone' />
            <TextField label='Active' source='active' />
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
                        // onClick={event =>
                        //     openUserContextMenu(event.currentTarget, user, index, {
                        //         getContentAnchorEl: null,
                        //         anchorOrigin: {
                        //             vertical: "bottom",
                        //             horizontal: "right",
                        //         },
                        //         transformOrigin: {
                        //             vertical: "top",
                        //             horizontal: "right",
                        //         },
                        //     })
                        // }
                    >
                        <MoreHorizIcon fontSize="small" />
                    </IconButton>
                )}
            />
        </InfiniteScrollTable>
    );
};

export default CustomersTable;
