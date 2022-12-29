import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MarketingApp from './components/MarketingApp';
import Header from './components/Header';
// mount was moved to ./components/MarketingApp
//import { mount } from 'marketing/MarketingApp'
//console.log(mount);

export default () => {
    // Note placing <BrowserRouter></BrowserRouter> in
    // (); is very important to prevent you from seeing 
    // some weird export error in the browser console.
    return (
        <BrowserRouter>
        <div>
            <Header/>
            <MarketingApp/>
        </div>
        </BrowserRouter>
    );
};