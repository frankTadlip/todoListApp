import { Mongo } from 'meteor/mongo';

export const PersonService = new Mongo.Collection('persons');