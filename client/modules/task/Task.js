import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/image/edit'
import DeleteIcon from 'material-ui/svg-icons/navigation/close'
import moment from 'moment';

import EditTaskDialog from './edit_task_dialog';

const tableData = [
    {
        selected: false,
        task: 'Create Module',
        dateStart: '',
        dateFinished: '',
        status: 'Inprogress',
    },
    {
        selected: false,
        task: 'Routing',
        dateStart: '',
        dateFinished: '',
        status: 'Inprogress',
    },
    {
        selected: false,
        task: 'Create Actions',
        dateStart: '',
        dateFinished: '',
        status: 'Inprogress',
    }
];

export default class Task extends Component {
    constructor(props) {
        super(props);

        this.state = {
            field: '',
            tableData: tableData,
            editTask: false,
            data: {}
        };
    }

    openDialog(row) {
        this.setState({
            editTask: true,
            data: row
        });
    }

    closeDialog() {
        this.setState({
            editTask: false
        });
    }

    disableWeekends(date) {
        return date.getDay() === 0 || date.getDay() === 6;
    }

    checkField() {
        const { task } = this.refs;
        this.setState({
            field: task.input.value
        });
    }

    addTask() {

        const { task, datestart } = this.refs;

        var tasks = {
            task: task.input.value,
            dateStart: moment(datestart.state.date).format('MM/DD/YYYY')
        }

        tableData.unshift(tasks);

        this.setState({
            tableData: tableData,
            field: ''
        });

        task.input.value = '';
       // datestart.refs.input.input.value = null;
    }

    render() {
        return (
            <div>
                <form >
                    <Paper style={{ marginBottom: '10px', padding: '0 10px 10px 10px', display: 'flex' }}>
                        <div style={{ flex: '3', paddingRight: "15px" }}>
                            <TextField style={{ marginTop: '0' }}
                                hintText="Specify Task"
                                floatingLabelText="Task"
                                fullWidth={true}
                                onChange={this.checkField.bind(this)}
                                ref='task'
                            />
                            <small style={{ color: '#bbb' }}>***<i> Minimum of 3 characters</i></small>
                        </div>
                        <div style={{ marginTop: '24px', flex: '1', paddingRight: "15px", width: '100%' }}>
                            <DatePicker ref="datestart" hintText="Date Start" />
                        </div>
                        <div style={{ marginTop: '24px', flex: '1' }}>
                            <RaisedButton
                                label="Add Task"
                                primary={true}
                                fullWidth={true}
                                onTouchTap={this.addTask.bind(this)}
                                disabled={!this.state.field.length}
                            />
                        </div>
                    </Paper>
                </form>

                <Paper zDepth={1} >
                    <Table
                        fixedHeader={true}
                        selectable={true}
                        multiSelectable={true}>
                        <TableHeader
                            displaySelectAll={true}
                            adjustForCheckbox={true}
                            enableSelectAll={true}>
                            <TableRow>
                                <TableHeaderColumn tooltip="Task">Task</TableHeaderColumn>
                                <TableHeaderColumn tooltip="Date Start">Date Start</TableHeaderColumn>
                                <TableHeaderColumn tooltip="Date Finished">Date Finished</TableHeaderColumn>
                                <TableHeaderColumn style={{ textAlign: 'right' }}></TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={true}
                            deselectOnClickaway={false}
                            showRowHover={true}
                            stripedRows={false}
                        >
                            {tableData.map((row, index) => (
                                <TableRow key={index} selected={row.selected}>
                                    <TableRowColumn>{row.task}</TableRowColumn>
                                    <TableRowColumn>{row.dateStart ? row.dateStart : '--'}</TableRowColumn>
                                    <TableRowColumn>{row.dateFinished ? row.dateFinished : '--'}</TableRowColumn>
                                    <TableRowColumn style={{ textAlign: 'right' }}>
                                        <div>
                                            <IconButton onTouchTap={this.openDialog.bind(this, row)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton >
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    </TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}
