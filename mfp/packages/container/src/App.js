import React from 'react';
import MarketingApp from './components/MarketingApp';

// mount was moved to ./components/MarketingApp
//import { mount } from 'marketing/MarketingApp'
//console.log(mount);

export default () => {
    return <div>
        <h1>Hi there!</h1>
        <hr/>
        <MarketingApp/>
        </div>;
}; 