import { createContainer } from 'meteor/react-meteor-data';
import { TaskService } from '../../../imports/api/task-service.js';
import Task from './Task';

export default createContainer((props) => {

    const listOfTask = Meteor.subscribe("tasks", props.params._id);
    let tasks = [];

    if (listOfTask.ready()) {
         tasks = TaskService.find({personId: props.params._id}).fetch();
    }

    return {
        tasks: tasks
    };
}, Task);