import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import methods from './methods';
import publications from './publications';

publications();
methods();