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
            onNavigate: (location) => {
                console.log(location);
            }
        });
    });

    return <div ref={ref} />;
}