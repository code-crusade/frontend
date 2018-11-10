import * as React from 'react';
import { Route, Switch } from 'react-router';
import { GroupsAddPage } from './pages/Add';
import { GroupsBrowsePage } from './pages/Browse';

export const GroupsRoutes = () => (
  <Switch>
    <Route exact path="/groups" component={GroupsBrowsePage} />
    <Route exact path="/groups/add" component={GroupsAddPage} />
  </Switch>
);
