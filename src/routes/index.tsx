import * as React from 'react';
import { Route, Switch } from 'react-router';
import { DashboardBrowsePage } from '../modules/dashboard/pages/Browse';
import { ExercisesRoutes } from '../modules/exercises/Routes';

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={DashboardBrowsePage} />
    <Route path="/exercises" component={ExercisesRoutes} />
  </Switch>
);
