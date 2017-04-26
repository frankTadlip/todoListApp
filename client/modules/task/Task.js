import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/image/edit';
import DeleteIcon from 'material-ui/svg-icons/navigation/close';
import Back from 'material-ui/svg-icons/hardware/keyboard-backspace';
import moment from 'moment';

import EditTaskDialog from './edit_task_dialog';
import DeleteDialogComponent from '../core/shared-components/delete_dialog_component';
import { TaskService } from '../../../imports/api/task-service.js';
import { PersonService } from '../../../imports/api/person-service.js';


export default class Task extends Component {
    constructor(props) {
        super(props);

        this.state = {
            field: '',
            tableData: [],
            openTask: false,
            openDeleteDialog: false,
            openSnakbar: false,
            snakbarMessage: '',
            data: {},
            fullname: ''
        };
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

    // ADD EDIT TASK
    addTask() {

        const { _id } = this.props.params;
        const { task, datestart } = this.refs;
        var found = false;

        for (var a in this.state.tableData) {
            var b = this.state.tableData[a];

            if (b.task.toLowerCase() == task.input.value.toLowerCase()) {
                found = true;
            }
        }

        var tasks = {
            task: task.input.value,
            dateStart: datestart.state.date,
            dateFinished: null,
            status: 'Inprogress',
            selected: false,
            personId: _id
        }

        if (found == false) {
            this.setState({
                field: '',
                openSnakbar: true,
                snakbarMessage: 'Successfully Save'
            });

            // TaskService.insert(tasks);
            Meteor.call("task.addTask", tasks, (err) => { });

            task.input.value = '';
        } else {
            this.setState({
                openSnakbar: true,
                snakbarMessage: 'Already Exist'
            })
        }
    }

    removeTask(data, index) {
        this.setState({
            openDeleteDialog: true,
            data: data
        })
    }

    deleteData(id) {
        // delete data based on index
       Meteor.call("task.deleteTask", id, (err) => {
            if (err != undefined) 
                console.log(err);
       })
        this.closeDialog();
    }
    //


    openDialog(row) {
        this.setState({
            openTask: true,
            data: row
        });
    }

    closeDialog() {
        this.setState({
            openTask: false,
            openDeleteDialog: false
        });
    }

    back() {
        browserHistory.push('/person');
    }

    // will get all task assigned
    componentWillMount() {
        let name;
        var a = PersonService.find(this.props.params._id).fetch();
        for (var b in a) {
            var c = a[b];
            name = c.fullname;
        }
        this.setState({
            tableData: this.props.tasks,
            fullname: name
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ tableData: nextProps.tasks })
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
                            <DatePicker ref="datestart" hintText="Date Start" shouldDisableDate={this.disableWeekends} />
                        </div>
                        <div style={{ marginTop: '24px', flex: '1' }}>
                            <RaisedButton
                                label="Add Task"
                                primary={true}
                                fullWidth={true}
                                onTouchTap={this.addTask.bind(this)}
                                disabled={this.state.field.length < 3}
                            />
                        </div>
                    </Paper>
                </form>

                <Paper zDepth={1} >

                    <div style={{ display: "flex" }}>
                        <div style={{ flex: "1" }}>
                            <h4 style={{ margin: "10px 0 0 10px", textTransform: "uppercase" }}>{this.state.fullname}</h4>
                        </div>
                        <FlatButton label="Back" secondary={true} icon={<Back />} onTouchTap={this.back.bind(this)} />
                    </div>

                    <Table
                        fixedHeader={true}
                        selectable={true}
                        multiSelectable={false}>
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
                            {this.state.tableData.map((row, index) => (
                                <TableRow key={index} selected={row.selected}>
                                    <TableRowColumn>{row.task}</TableRowColumn>
                                    <TableRowColumn>{row.dateStart ? moment(row.dateStart).format('MM-DD-YYYY') : '--'}</TableRowColumn>
                                    <TableRowColumn>{row.dateFinished ? moment(row.dateFinished).format('MM-DD-YYYY') : '--'}</TableRowColumn>
                                    <TableRowColumn style={{ textAlign: 'right' }}>
                                        <div>
                                            <IconButton onTouchTap={this.openDialog.bind(this, row)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onTouchTap={this.removeTask.bind(this, row, index)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    </TableRowColumn>
                                </TableRow>

                            ))}

                        </TableBody>

                    </Table>
                </Paper>

                <Snackbar
                    open={this.state.openSnakbar}
                    message={this.state.snakbarMessage}
                    autoHideDuration={4000}
                />

                <EditTaskDialog
                    open={this.state.openTask}
                    close={this.closeDialog.bind(this)}
                    data={this.state.data}
                />
                <DeleteDialogComponent
                    open={this.state.openDeleteDialog}
                    close={this.closeDialog.bind(this)}
                    data={this.state.data}
                    otherMessage={this.state.data.task + ' on ' + moment(this.state.data.dateStart).format("MM/DD/YYYY")}
                    deleteSelected={this.deleteData.bind(this, this.state.data._id)}
                />

            </div>
        )
    }
}
