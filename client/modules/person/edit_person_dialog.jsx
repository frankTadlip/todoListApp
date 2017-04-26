import React from 'react';
import { Meteor } from 'meteor/meteor';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import { PersonService } from '../../../imports/api/person-service.js';

export default class EditPersonDialog extends React.Component {

    changePerson() {
        const { name, secondaryText } = this.refs;
        const { data, close } = this.props;

        data.fullname = name.input.value;
        data.secondaryText = secondaryText.input.value;

        Meteor.call("person.updatePerson", data, (err) => {
            if (err != undefined) 
                console.log(err);
        });

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
                onTouchTap={this.changePerson.bind(this)}
            />
        ];

        return (
            <div>
                <Dialog
                    title="Update"
                    actions={actions}
                    modal={true}
                    open={open}
                    onRequestClose={close}
                >

                    <TextField style={{ marginTop: '0' }}
                        hintText="Full Name"
                        floatingLabelText="Name"
                        fullWidth={true}
                        ref='name'
                        defaultValue={data ? data.fullname : null}
                    />

                    <TextField style={{ marginTop: '0' }}
                        hintText="Enter MOTTO"
                        floatingLabelText="Motto"
                        fullWidth={true}
                        ref='secondaryText'
                        defaultValue={data ? data.secondaryText : null}
                    />

                </Dialog>
            </div>
        )
    }
}