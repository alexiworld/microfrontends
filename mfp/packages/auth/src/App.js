import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

// To make material-ui generate truly randombly styles for
// different app. Prior to this the problem in production
// was that container's random class names were jss1, jss2, 
// ... , which colided with auth's random class names
// being the same. The browser was combining the styles
// properties defined in each one of the microfrontend apps
// and the final result was impacting each one of them as
// auth properties have been applied to container and
// vice versa. By introducing a different (custom) prefix
// for each one of the microfrontend apps we solve the 
// production problem. Note that this problem does not exist
// in development, where meaningful but very long names (not
// short names) are used.
const generateClassName = createGenerateClassName({
    productionPrefix: 'au'
});

// Do not miss {} around history. Otherwise, you can expect 
// very weird error related to the history property, one that 
// is difficult to understand.
export default ({history}) => {
    return <div>
        <StylesProvider generateClassName={generateClassName}>
            <Router history={history}>
                <Switch>
                </Switch>
            </Router>
        </StylesProvider>
    </div>
};