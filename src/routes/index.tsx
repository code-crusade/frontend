import * as React from 'react';
import { Route, Switch } from 'react-router';
import { ExercisesRoutes } from '../modules/exercises/Routes';
import { Home } from '../modules/home';

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/exercises" component={ExercisesRoutes} />
  </Switch>
);
