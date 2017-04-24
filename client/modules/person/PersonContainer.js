import { createContainer } from 'meteor/react-meteor-data';
import { PersonService } from '../../../imports/api/person-service.js';
import Person from './Person';

export default createContainer(() => {
    return {
        person: PersonService.find({}).fetch(),
    };
}, Person);