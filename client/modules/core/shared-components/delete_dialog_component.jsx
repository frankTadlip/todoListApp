import React from 'react';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';

export default class DeleteDialogComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openToast: false
        }
    }

    deleteAction(){
      this.setState({
          openToast: true
      })
    }

    render(){
        const { open, close, otherMessage, message, data, deleteSelected } = this.props;

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={close}
            />,
            <FlatButton
                label="Submit"
                secondary={true}
                keyboardFocused={true}
                onTouchTap={deleteSelected}
            />,
        ];


        return (
            <div>
                <Dialog
                title="Confirm Delete"
                actions={actions}
                modal={true}
                open={open}
                onRequestClose={close}>
                { message ? message: 'Please confirm to Delete this record!' }
                    <h3>{otherMessage}</h3>
                </Dialog>

               
            </div>
        )
    }
}