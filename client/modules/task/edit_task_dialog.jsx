import React from 'react';
import { Meteor } from 'meteor/meteor';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';

class EditTaskDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dateStart: null,
            dateFinished: null
        }
    }

    disableWeekends(date) {
        return date.getDay() === 0 || date.getDay() === 6;
    }

    changeTask() {
        const { task, datestart, datefinished } = this.refs;
        const { data, close } = this.props;

        data.task = task.input.value;
        data.dateStart = datestart.state.date
        data.dateFinished = datefinished.state.date

        if(data.dateFinished != null) {
            data.status = "Complete";
            data.selected = true;            
        }
        
        Meteor.call("task.updateTask", data, (err) => {
             if (err != undefined) 
                console.log(err);
        })

        close();
    }

    handleChangeDateStart(event, date) {
        this.setState({
            dateStart: date,
        });
    }

    handleChangeDateFinished(event, date) {
        this.setState({
            dateFinished: date,
        });
    }

    componentWillReceiveProps(nextProps) {
        const { dateStart, dateFinished } = nextProps.data;

        this.setState({
            dateStart: dateStart,
            dateFinished: dateFinished
        })
    }

    render() {
        const { open, close, data } = this.props;

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={close}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.changeTask.bind(this)}
            />,
        ];

        return (
            <div>
                <Dialog
                    title="Update Task"
                    actions={actions}
                    modal={true}
                    open={open}
                    onRequestClose={close}
                >

                    <TextField style={{ marginTop: '0' }}
                        hintText="Specify Task"
                        floatingLabelText="Update Task"
                        fullWidth={true}
                        ref='task'
                        defaultValue={data ? data.task : null}
                    />

                    <DatePicker ref="datestart"
                        value={this.state.dateStart}
                        hintText="Date Start"
                        shouldDisableDate={this.disableWeekends}
                        onChange={this.handleChangeDateStart.bind(this)} />

                    <DatePicker ref="datefinished"
                        value={this.state.dateFinished}
                        hintText="Date Finished"
                        shouldDisableDate={this.disableWeekends}
                        onChange={this.handleChangeDateFinished.bind(this)} />

                </Dialog>
            </div>
        );
    }
}
export default EditTaskDialog