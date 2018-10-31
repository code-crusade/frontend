import * as React from 'react';
import { Route, Switch } from 'react-router';
import { LoginPage } from './pages/Login';

export const AuthRoutes = () => (
  <Switch>
    <Route exact path="/auth/login" component={LoginPage} />
  </Switch>
);
