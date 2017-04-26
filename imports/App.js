import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Router, Route, IndexRoute, browserHistory} from 'react-router';

import TaskContainer from '../client/modules/task/TaskContainer';
import PersonContainer from '../client/modules/person/PersonContainer';

import Root from '../client/modules/core/Root';

injectTapEventPlugin();

export default class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <h1>Todo List Meteor + React</h1>
                    <Router history={browserHistory}>
                        <Route path="/" component={Root}>
                            <IndexRoute component={PersonContainer} />
                            <Route path="person" component={PersonContainer}></Route>
                            <Route path="task/:_id" component={TaskContainer}></Route>
                        </Route>
                    </Router>
                </div>
            </MuiThemeProvider>
        )
    }
}