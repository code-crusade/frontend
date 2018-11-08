import * as React from 'react';
import { Route, Switch } from 'react-router';
import { GroupsAddPage } from './pages/Add';

export const GroupsRoutes = () => (
  <Switch>
    {<Route exact path="/groups/add" component={GroupsAddPage} />}
  </Switch>
);
