import * as React from 'react';
import { Route, Switch } from 'react-router';
import { ExercisesAddPage } from './pages/Add';
import { ExercisesBrowsePage } from './pages/Browse';
import { ExercisesEditPage } from './pages/Edit';
import { ExercisesReadPage } from './pages/Read';

export const ExercisesRoutes = () => (
  <Switch>
    <Route exact path="/exercises" component={ExercisesBrowsePage} />
    <Route exact path="/exercises/add" component={ExercisesAddPage} />
    <Route exact path="/exercises/:id/edit" component={ExercisesEditPage} />
    <Route exact path="/exercises/:id" component={ExercisesReadPage} />
  </Switch>
);
