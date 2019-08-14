import React, { useContext, useState } from "react";
import get from "lodash/get";

import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import InfiniteScrollTable from "../../../common/components/InfiniteScrollTable/InfiniteScrollTable";
import TextField from "../../../common/components/InfiniteScrollTable/TextField";

import { EmployeesContext } from "./EmployeesContext";
import EmployeeContextMenu from "./EmployeeContextMenu";

const useStyles = makeStyles(theme => ({
    buttonMore: {
        padding: theme.spacing(0.5),
    },
}));

const EmployeesTable = () => {
    const classes = useStyles();
    const employees = useContext(EmployeesContext);
    const [currentEmployee, setCurrenctEmployee] = useState({
        employee: null,
        index: -1,
    });
    const [employeeContextMenu, setEmployeeContextMenu] = useState({
        open: false,
        anchorEl: null,
        props: {},
    });

    function openEmployeeContextMenu(anchorEl, employee, index, props = {}) {
        setCurrenctEmployee({
            employee: employee,
            index: index,
        });
        setEmployeeContextMenu({
            open: true,
            anchorEl: anchorEl,
            props: props,
        });
    }

    function closeEmployeeContextMenu() {
        setCurrenctEmployee({
            employee: null,
            index: -1,
        });
        setEmployeeContextMenu({
            open: false,
            anchorEl: null,
            props: {},
        });
    }

    return (
        <React.Fragment>
            <InfiniteScrollTable
                data={{
                    ids: employees.ids,
                    records: employees.data,
                }}
                loadMore={employees.loadMore}
                hasMore={employees.hasMore}
                errorLoading={employees.error !== null}
            >
                <TextField label="Employee" source="display_name" />
                <TextField label="Phone" source="primary_phone" />
                <TextField label="Active" source="active" />
                <TextField label="Account" source="user.username" />
                <TextField
                    label="Role"
                    value={employee => {
                        const assignments = get(employee, "user.assignments");
                        if (assignments) {
                            return assignments.map(assignment => assignment.item.description).join(",");
                        } else {
                            return null;
                        }
                    }}
                />
                <TextField
                    cellProps={{
                        style: {
                            width: "50px",
                            padding: 0,
                        },
                    }}
                    content={(employee, index) => (
                        <IconButton
                            aria-label="More"
                            size="small"
                            className={classes.buttonMore}
                            onClick={event =>
                                openEmployeeContextMenu(event.currentTarget, employee, index, {
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
            <EmployeeContextMenu
                employee={currentEmployee.employee}
                employeeIndex={currentEmployee.index}
                anchorEl={employeeContextMenu.anchorEl}
                open={employeeContextMenu.open}
                onClose={closeEmployeeContextMenu}
                {...employeeContextMenu.props}
            />
        </React.Fragment>
    );
};

export default EmployeesTable;
