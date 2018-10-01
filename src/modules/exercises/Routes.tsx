import * as React from 'react';
import { Route, Switch } from 'react-router';
import { ExercicesBrowsePage } from './pages/Browse';
import { ExercisesReadPage } from './pages/Read';

export const ExercisesRoutes = () => (
  <Switch>
    <Route exact path="/exercises" component={ExercicesBrowsePage} />
    <Route exact path="/exercises/:id" component={ExercisesReadPage} />
  </Switch>
);
