// Copied from AuthApp
import { mount } from 'dashboard/DashboardApp';
import React, {useRef, useEffect } from 'react';
// We are not using the history for dashboard
// and therefore history related code is removed.

export default ({ onSignIn }) => {
    // The approach with useRef, useEffect, mount can
    // be used with any other framework as long that
    // framework can render itself in some HTML element.

    const ref = useRef(null);

    // useEffect ensures the code is executed only once, 
    // when the component shows up.
    // in 97. Container to Child Communication, the trainer
    // suggests to add an empty dependencies [] to useEffect
    // function to limit lambda function to be called only once.
    useEffect(() => {
        mount(ref.current);
    }, []);

    return <div ref={ref} />;
}