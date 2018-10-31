import * as React from 'react';
import { Route, Switch } from 'react-router';
import { GroupsRoutes } from 'src/modules/groups/Routes';
import { AuthRoutes } from '../modules/auth/Routes';
import { DashboardBrowsePage } from '../modules/dashboard/pages/Browse';
import { ExercisesRoutes } from '../modules/exercises/Routes';
import { UsersRoutes } from '../modules/users/Routes';

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={DashboardBrowsePage} />
    <Route path="/auth" component={AuthRoutes} />
    <Route path="/exercises" component={ExercisesRoutes} />
    <Route path="/users" component={UsersRoutes} />
    <Route path="/groups" component={GroupsRoutes} />
  </Switch>
);
