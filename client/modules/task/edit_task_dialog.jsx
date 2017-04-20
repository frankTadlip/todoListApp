import React from 'react';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';

class EditTaskDialog extends React.Component {

    disableWeekends(date) {
        return date.getDay() === 0 || date.getDay() === 6;
    }

    changeTask() {
        const { task } = this.refs;
        const { data, close } = this.props;

        data.task = task.input.value;
        close();
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

                    <DatePicker value={data.dateStart} hintText="Date Start" shouldDisableDate={this.disableWeekends} />

                    <DatePicker hintText="Date Finished" shouldDisableDate={this.disableWeekends} />
                </Dialog>
            </div>
        );
    }
}
export default EditTaskDialog