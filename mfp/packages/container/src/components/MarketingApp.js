import { mount } from 'marketing/MarketingApp';
import React, {useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
    // The approach with useRef, useEffect, mount can
    // be used with any other framework as long that
    // framework can render itself in some HTML element.

    const ref = useRef(null);
    const history = useHistory();

    // useEffect ensures the code is executed only once, 
    // when the component shows up.
    // in 97. Container to Child Communication, the trainer
    // suggests to add an empty dependencies [] to useEffect
    // function to limit lambda function to be called only once.
    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            // Fix the double click on Login button issue by
            // passing the initial path to the marketing app's
            // mount function.
            initialPath: history.location.pathname,
            // restructure (or project) property from
            // location object and at the same time
            // rename it to nextPath. {pathname} is to
            // project, and :nextPathname is to rename it.
            onNavigate: ({pathname: nextPathname}) => {
                // To prevent infinite loop when marketing notifies
                // the container and updates browser history, and 
                // that one causes to push event from the container
                // to the marketing app to update marketing app memory
                // history, which triggers event to the container, and
                // so on. The following line and "if" condition solves it.
                const { pathname } = history.location;
                if (pathname !== nextPathname) {
                    history.push(nextPathname);
                }
            }
        });

        history.listen(onParentNavigate);
    }, []);

    return <div ref={ref} />;
}