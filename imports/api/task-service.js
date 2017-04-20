import { Mongo } from 'meteor/mongo';

export const TaskService = new Mongo.Collection('tasks');