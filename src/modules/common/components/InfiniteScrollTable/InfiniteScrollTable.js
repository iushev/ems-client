import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import InfiniteScroll from '../InfiniteScroll';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableBody';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';

const styles = (theme) => ({
    wrapper: {
        width: '100%',
        height: '100%',
        overflow: 'auto',
        position: 'relative',
    },
    header: {
        top: 0,
        position: 'sticky',
        backgroundColor: theme.palette.background.default,
        tableLayout: 'fixed',
        zIndex: 1,
    },
    body: {
        tableLayout: 'fixed',
    },
    row: {
        height: theme.spacing(4),
    },
    cell: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    checkboxCell: {
        width: theme.spacing(4),
    },
    checkboxRoot: {
        padding: 0,
    }
});

class InfiniteScrollTable extends Component {
    state = {
        selectedRows: [],
    }

    selectionChanged = () => {
        const { selectionChanged } = this.props;
        if (selectionChanged) {
            const { selectedRows } = this.state;
            selectionChanged(selectedRows);
        }
    }

    toggleRowSelection = (row) => {
        const { selectableRows } = this.props;
        if (selectableRows === 0) {
            return;
        }

        if (selectableRows === 1) {
            const { selectedRows } = this.state;
            if (selectedRows.includes(row)) {
                this.setState({
                    selectedRows: [],
                }, () => {
                    this.selectionChanged();
                });
            } else {
                this.setState({
                    selectedRows: [row],
                }, () => {
                    this.selectionChanged();
                });
            }
        } else {
            const { selectedRows } = this.state;
            if (selectedRows.includes(row)) {
                this.setState((prevState) => ({
                    selectedRows: prevState.selectedRows.filter((item) => item !== row)
                }), () => {
                    this.selectionChanged();
                });
            } else {
                this.setState((prevState) => ({
                    selectedRows: [...prevState.selectedRows, row],
                }), () => {
                    this.selectionChanged();
                });
            }
        }
    }

    handleSelectAll = (event) => {
        const { data } = this.props;
        if (event.target.checked) {
            this.setState({
                selectedRows: data.ids.reduce((records, id) => {
                    const record = data.records[id];
                    records.push(record);
                    return records;
                }, [])
            }, () => {
                this.selectionChanged();
            });
        } else {
            this.setState({
                selectedRows: [],
            }, () => {
                this.selectionChanged();
            });
        }
    }

    render() {
        const { classes, data, hasMore, loadMore, errorLoading, children, selectableRows, cellProps } = this.props;
        const { selectedRows }  = this.state;
        return (
            <InfiniteScroll
                className={classes.wrapper}
                loadMore={loadMore}
                hasMore={hasMore}
                errorLoading={errorLoading}
            >
                <Table className={classes.header} size="small">
                    <TableHead>
                        <TableRow className={classes.row}>
                            {selectableRows > 0 ? (
                                <TableCell
                                    className={classes.checkboxCell}
                                    padding="checkbox"
                                >
                                    {selectableRows > 1 ?  (
                                        <Checkbox
                                            color="primary"
                                            classes={{
                                                root: classes.checkboxRoot,
                                            }}
                                            indeterminate={selectedRows.length > 0 && selectedRows.length !== data.length}
                                            checked={ selectedRows.length > 0 }
                                            onChange={this.handleSelectAll}
                                        />
                                    ) : null}
                                </TableCell>
                            ) : null}
                            {React.Children.map(children, (field, index) => (
                                <TableCell
                                    className={classes.cell}
                                    variant="head"
                                    key={field.props.source || index}
                                    {...cellProps}
                                    {...field.props.cellProps}
                                >
                                    {field.props.label ? field.props.label : field.props.source}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                </Table>
                <Table className={classes.body} size="small">
                    <TableBody>
                        { data.ids.map((id, index) => {
                            const record = data.records[id];
                            return (
                                <TableRow
                                    key={index}
                                    className={classes.row}
                                    hover
                                >
                                    {selectableRows > 0 ? (
                                        <TableCell
                                            className={classes.checkboxCell}
                                            padding="checkbox"
                                        >
                                            <Checkbox
                                                color="primary"
                                                classes={{
                                                    root: classes.checkboxRoot,
                                                }}
                                                checked={ selectedRows.includes(record) }
                                                onChange={() => this.toggleRowSelection(record)}
                                            />
                                        </TableCell>
                                    ) : null}
                                    {React.Children.map(children, (field, fieldIndex) => (
                                        <TableCell
                                            className={classes.cell}
                                            key={field.props.source || fieldIndex}
                                            {...cellProps}
                                            {...field.props.cellProps}
                                        >
                                            {React.cloneElement(field, {
                                                record,
                                                rowIndex: index,
                                            })}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </InfiniteScroll>
        );
    }
}

InfiniteScrollTable.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.shape({
        ids: PropTypes.array,
        records: PropTypes.object,
    }),
    hasMore: PropTypes.bool,
    loadMore: PropTypes.func,
    errorLoading: PropTypes.bool,
    children: PropTypes.node.isRequired,
    selectableRows: PropTypes.number,
    selectionChanged: PropTypes.func,
    cellProps: PropTypes.object,
};

export default withStyles(styles)(InfiniteScrollTable);

