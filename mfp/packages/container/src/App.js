import React, { lazy, Suspense, useState, useEffect  } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';
import Header from './components/Header';
import Progress from './components/Progress';

const MarketingLazy = lazy(() =>  import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

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

const history = createBrowserHistory();

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    // Will run the lambda function whenever the value of
    // isSignedIn changes.
    useEffect(() => {
        if (isSignedIn) {
            history.push('/dashboard');
        // The 'else' part is something we don't want to do so.
        // The way to handle this case is see dashboard route's
        // isSignedIn use and <Redirect/>
        //} else {
        //    history.push('/');
        }
    }, [ isSignedIn ]);

    // Note placing <BrowserRouter></BrowserRouter> in
    // (); is very important to prevent you from seeing 
    // some weird export error in the browser console.

    // '/dashboard' must be inserted before the general
    // '/' to give it a chance to be processed.
    //
    // Accessing history in <BrowserRouter> ain't easy.
    // The way around this is to replace it with generic
    // <Router> and tell it which history we would like 
    // to use.
    return (
        <StylesProvider generateClassName={generateClassName}>
            <Router history={history}>
            <div>
                <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn}/>
                <Suspense fallback={<Progress/>}>
                    <Switch>
                        <Route path="/auth">
                            <AuthLazy onSignIn={() => setIsSignedIn(true)}/>
                        </Route>
                        <Route path="/dashboard">
                            {!isSignedIn && <Redirect to="/"/> }
                            <DashboardLazy/>
                            
                        </Route>
                        <Route path="/" component={MarketingLazy}/>
                    </Switch>
                </Suspense>
            </div>
            </Router>
        </StylesProvider>
    );
};