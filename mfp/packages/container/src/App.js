import React, { lazy, Suspense  } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import Header from './components/Header';

const MarketingLazy = lazy(() =>  import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));

// To make material-ui generate truly randombly styles for
// different app. Prior to this the problem in production
// was that container's random class names were jss1, jss2, 
// ... , which colided with marketing's random class names
// being the same. The browser was combining the styles
// properties defined in each one of the microfrontend apps
// and the final result was impacting each one of them as
// marketing properties have been applied to container and
// vice versa. By introducing a different (custom) prefix
// for each one of the microfrontend apps we solve the 
// production problem. Note that this problem does not exist
// in development, where meaningful but very long names (not
// short names) are used.
const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
});

export default () => {
    // Note placing <BrowserRouter></BrowserRouter> in
    // (); is very important to prevent you from seeing 
    // some weird export error in the browser console.
    return (
        <StylesProvider generateClassName={generateClassName}>
            <BrowserRouter>
            <div>
                <Header/>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route path="/auth" component={AuthLazy}/>
                        <Route path="/" component={MarketingLazy}/>
                    </Switch>
                </Suspense>
            </div>
            </BrowserRouter>
        </StylesProvider>
    );
};