import React from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

export default class Person extends React.Component {
    render() {
        return (
            <div>
                <form action="">
                    <Paper style={{ marginBottom: '10px', padding: '0 10px 10px 10px', display: 'flex' }}>
                      <TextField style={{ marginTop: '0' }}
                                hintText="Add Person"
                                floatingLabelText="Person"
                                fullWidth={true}
                                ref='person'
                            />
                    </Paper>
                </form>
            </div>
        )
    }
}