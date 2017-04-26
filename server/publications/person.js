import { Meteor } from 'meteor/meteor';
import { PersonService } from '../../imports/api/person-service';

export default function () {
    Meteor.publish("persons", function () {
        return PersonService.find();
    });

    // Meteor.publish("person.insert", function () {

    // })
}