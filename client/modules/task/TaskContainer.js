import { createContainer } from 'meteor/react-meteor-data';
import { TaskService } from '../../../imports/api/task-service.js';
import Task from './Task';

export default createContainer(() => {
    return {
        tasks: TaskService.find({}).fetch(),
    };
}, Task);