import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { TaskService } from '../../imports/api/task-service';

export default function () {

    Meteor.methods({

         // ADDING task
        'task.addTask'(task) {
            check(task, Object);

            TaskService.insert({
                task: task.task,
                dateStart: task.dateStart,
                dateFinished: task.dateFinished,
                status: task.status,
                selected: task.selected,
                personId: task.personId
            })
        },

        // UPDATING task
        'task.updateTask'(task) {
            check(task, Object);

            TaskService.update({ _id: task._id }, {
                $set: {
                    task: task.task,
                    dateStart: task.dateStart,
                    dateFinished: task.dateFinished,
                    status: task.status,
                    selected: task.selected
                }
            });
        },

        // DELETING task
        'task.deleteTask'(taskId) {
            check(taskId, String);
            TaskService.remove({ _id: taskId });
        }
        
    })
}