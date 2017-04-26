import { createContainer } from 'meteor/react-meteor-data';
import { PersonService } from '../../../imports/api/person-service.js';
import { Meteor } from 'meteor/meteor';
import Person from './Person';

export default createContainer(() => {

    const listOfPerson = Meteor.subscribe("persons");
    let persons = [];

    if (listOfPerson.ready()) {
         persons = PersonService.find().fetch();
    }

    return {
        persons: persons
    };
}, Person);