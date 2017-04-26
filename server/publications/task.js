import { Meteor } from 'meteor/meteor';
import { TaskService } from '../../imports/api/task-service';

export default function () {
    Meteor.publish("tasks", function (id) {
        return TaskService.find({personId: id});
    });

}