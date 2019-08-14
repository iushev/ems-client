import React, { Fragment, useState, useContext } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import InfiniteScrollTable from "modules/common/components/InfiniteScrollTable/InfiniteScrollTable";
import TextField from "modules/common/components/InfiniteScrollTable/TextField";
import LinkField from "modules/common/components/InfiniteScrollTable/LinkField";

import InspectionContextMenu from "./InspectionContextMenu";
import { InspectionsContext } from "./InspectionsContext";

const useStyles = makeStyles(theme => ({
    buttonMore: {
        padding: theme.spacing(0.5),
    },
}));

const InspectionTable = () => {
    const classes = useStyles();
    const [currentInspection, setCurrenctInspection] = useState({
        inspection: null,
        index: -1,
    });
    const [inspectionContextMenu, setInspectionContextMenu] = useState({
        open: false,
        anchorEl: null,
        props: {},
    });
    const inspections = useContext(InspectionsContext)

    function openContextMenu(anchorEl, record, index, props = {}) {
        setCurrenctInspection({
            inspection: record,
            index: index,
        });
        setInspectionContextMenu({
            open: true,
            anchorEl: anchorEl,
            props: props,
        });
    }

    function closeContextMenu() {
        setInspectionContextMenu({
            open: false,
            anchorEl: null,
            props: {},
        });
    }

    return (
        <Fragment>
            <InfiniteScrollTable
                data={{
                    ids: inspections.ids,
                    records: inspections.data,
                }}
                loadMore={inspections.loadMore}
                hasMore={inspections.hasMore}
                errorLoading={inspections.error !== null}
            >
                <LinkField label="Date" source="date" urlCreator={record => `/inspections/${record.id}`} />
                <TextField label="Object" source="object.display_name" />
                <TextField label="Inspected By" source="inspector.display_name" />
                <TextField
                    cellProps={{
                        style: {
                            width: "50px",
                            padding: 0,
                        },
                    }}
                    content={(record, index) => (
                        <IconButton
                            aria-label="More"
                            size="small"
                            className={classes.buttonMore}
                            onClick={event =>
                                openContextMenu(event.currentTarget, record, index, {
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
            <InspectionContextMenu
                inspection={currentInspection.inspection}
                inspectionIndex={currentInspection.index}
                anchorEl={inspectionContextMenu.anchorEl}
                open={inspectionContextMenu.open}
                onClose={closeContextMenu}
                {...inspectionContextMenu.props}
            />
        </Fragment>
    );
};

InspectionTable.displayName = "InspectionTable";

export default InspectionTable;
