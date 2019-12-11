import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';


import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Authentification from './pages/Authentification';


import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
);

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" exact component={Login}/>
                <Route path="/" exact component={Login}/>
                <Route path="/register" exact component={Register}/>
                <PrivateRoute path="/products" exact component={Products}/>
                <PrivateRoute path="/mercadolivre/auth" exact component={Authentification}/>
            </Switch>
        </BrowserRouter>
    );
}