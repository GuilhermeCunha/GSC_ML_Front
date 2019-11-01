import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import Login from './pages/Login';
import Register from './pages/Register';

export default function Routes(){
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/login" exact component={Login}/>
            <Route path="/register" exact component={Register}/>
        </Switch>
        </BrowserRouter>
    );
}