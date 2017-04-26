import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { PersonService } from '../../imports/api/person-service';
import { TaskService } from '../../imports/api/task-service';

export default function () {

    Meteor.methods({

        // ADDING PERSON
        'person.addPerson'(person) {
            check(person, Object);

            PersonService.insert({
                fullname: person.fullname,
                secondaryText: person.secondaryText,
                avatar: person.avatar
            });
        },

        // UPDATING PERSON
        'person.updatePerson'(person) {
            check(person, Object);

            PersonService.update({ _id: person._id }, {
                $set: {
                    fullname: person.fullname,
                    secondaryText: person.secondaryText,
                    avatar: ''
                }
            });
        },

        // DELETING PERSON
        'person.deletePerson'(personId) {
            check(personId, String);

            PersonService.remove(personId);
            TaskService.remove({ personId: personId });
        },


        /**
         *  ADD EDIT DELETE TASK
         * 
         * @param {any} task 
         */

        // // ADDING task
        // 'task.addTask'(task) {
        //     check(task, Object);

        //     TaskService.insert({
        //         task: task.task,
        //         dateStart: task.dateStart,
        //         dateFinished: task.dateFinished,
        //         status: task.status,
        //         selected: task.selected,
        //         personId: task.personId
        //     })
        // },

        // // UPDATING task
        // 'task.updateTask'(task) {
        //     check(task, Object);

        //     TaskService.update({ _id: task._id }, {
        //         $set: {
        //             task: task.task,
        //             dateStart: task.dateStart,
        //             dateFinished: task.dateFinished,
        //             status: task.status,
        //             selected: task.selected
        //         }
        //     });
        // },

        // // DELETING task
        // 'task.deleteTask'(taskId) {
        //     check(taskId, String);
        //     TaskService.remove({ _id: taskId });
        // }

    })
}