import { mount } from 'marketing/MarketingApp';
import React, {useRef, useEffect } from 'react';

export default () => {
    // The approach with useRef, useEffect, mount can
    // be used with any other framework as long that
    // framework can render itself in some HTML element.

    const ref = useRef(null);

    // useEffect ensures the code is executed only once, 
    // when the component shows up.
    useEffect(() => {
        mount(ref.current, {
            // restructure (or project) property from
            // location object and at the same time
            // rename it to nextPath. {pathname} is to
            // project, and :nextPathname is to rename it.
            onNavigate: ({pathname: nextPathname}) => {
                console.log(nextPathname);
            }
        });
    });

    return <div ref={ref} />;
}