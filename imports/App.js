import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Task from '../client/modules/task/Task';

injectTapEventPlugin();

export default class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <h1>Todo List Meteor + React</h1>
                    <Task />
                </div>
            </MuiThemeProvider>
        )
    }
}