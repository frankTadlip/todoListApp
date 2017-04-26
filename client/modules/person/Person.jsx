import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

// MATERIAL UI
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MenuIcon from 'material-ui/svg-icons/navigation/more-vert'
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import EditIcon from 'material-ui/svg-icons/image/edit';
import DeleteIcon from 'material-ui/svg-icons/navigation/close';
import ViewIcon from 'material-ui/svg-icons/av/playlist-add-check';

import { PersonService } from '../../../imports/api/person-service.js';
import { TaskService } from '../../../imports/api/task-service.js';
import DeleteDialogComponent from '../core/shared-components/delete_dialog_component';
import EditPersonDialog from './edit_person_dialog';

const iconButtonElement = (
    <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
    >
        <MenuIcon color={grey400} />
    </IconButton>
);

const rightIconMenu = (data, viewTask, editPerson, removePerson) => (
    <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem primaryText="View Task" onTouchTap={viewTask.bind(this, data._id)} leftIcon={<ViewIcon />}> </MenuItem>
        <MenuItem primaryText="Edit" leftIcon={<EditIcon />} onTouchTap={editPerson.bind(this, data)}> </MenuItem>
        <MenuItem
            primaryText="Delete"
            leftIcon={<DeleteIcon />}
            onTouchTap={removePerson.bind(this, data)}
        ></MenuItem>
    </IconMenu>
);


export default class Person extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            field: '',
            listData: [],
            openPerson: false,
            openDeleteDialog: false,
            data: {}
        };
    }

    viewTask(id) {
        browserHistory.push(`task/${id}`);
    }

    checkField() {
        const { person } = this.refs;
        this.setState({
            field: person.input.value
        });
    }

    addPerson() {
        const { person } = this.refs;
        let found = false;

        for (var a in this.state.listData) {
            var b = this.state.listData[a];

            if (b.fullname.toLowerCase() == person.input.value.toLowerCase()){
                found = true;
            }
                
        }

        var personToAdd = {
            avatar: null,
            fullname: person.input.value,
            secondaryText: ''
        }

        if (!found) {
            this.setState({
                listData: [personToAdd, ...this.state.listData],
                field: ''
            })
            Meteor.call("person.addPerson", personToAdd, (err) => {
                    if (err != undefined) 
                         console.log(err);
            })

            person.input.value = '';
        }
    }

    // FOR EDIT DIALOG
    editPerson(data) {
        this.setState({
            openPerson: true,
            data: data
        })
    }

    closeDialog() {
        this.setState({
            openPerson: false,
            openDeleteDialog: false
        });
    }
    // ===
    // FOR DELETE DIALOG
    removePerson(data) {
        this.setState({
            openDeleteDialog: true,
            data: data
        })
    }
    
    deleteData(id) {
       Meteor.call("person.deletePerson", id, (err) => {
           if (err != undefined) 
                 console.log(err);
       })
        // TaskService.remove({personId: id});
        this.closeDialog();
    }
    // ===
   
    // returning to this page will load the data
    componentWillMount() {
        this.setState({
            listData: this.props.persons
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            listData: nextProps.persons
        })
    }


    render() {
        return (
            <div>
                <form action="">
                    <Paper style={{ marginBottom: '10px', padding: '0 10px 10px 10px', display: 'flex' }}>
                        <div style={{ flex: '3', paddingRight: "15px" }}>
                            <TextField style={{ marginTop: '0' }}
                                hintText="Add Person"
                                floatingLabelText="Person"
                                fullWidth={true}
                                onChange={this.checkField.bind(this)}
                                ref='person'
                            />
                            <small style={{ color: '#bbb' }}>***<i> Minimum of 3 characters</i></small>
                        </div>
                        <div style={{ marginTop: '24px', flex: '1' }}>
                            <RaisedButton
                                label="Add Person"
                                primary={true}
                                fullWidth={true}
                                onTouchTap={this.addPerson.bind(this)}
                                disabled={this.state.field.length < 3}
                            />
                        </div>

                    </Paper>
                </form>

                <Paper zDepth={1} >
                    <List>
                        <Subheader>Today</Subheader>
                        {this.state.listData.map((data, index) => (
                            <ListItem key={index}
                                leftAvatar={<Avatar />}
                                primaryText={data.fullname}
                                secondaryText={data.secondaryText}
                                rightIconButton={rightIconMenu(data, this.viewTask.bind(this, data._id), this.editPerson.bind(this, data), this.removePerson.bind(this, data))}
                            />
                        ))}
                    </List>
                </Paper>

                <EditPersonDialog
                    open={this.state.openPerson}
                    close={this.closeDialog.bind(this)}
                    data={this.state.data} />

                <DeleteDialogComponent
                    open={this.state.openDeleteDialog}
                    close={this.closeDialog.bind(this)}
                    data={this.state.data}
                    otherMessage={this.state.data.fullname}
                    deleteSelected={this.deleteData.bind(this, this.state.data._id)}
                />

            </div>
        )
    }
}