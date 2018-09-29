import * as React from 'react';
import { Route, Switch } from 'react-router';
import { ExercisesReadPage } from './pages/Read';

export const ExercisesRoutes = () => {
  return (
    <Switch>
      {/*<Route exact path="/exercises" component={Browse} />*/}
      <Route exact path="/exercises/:id" component={ExercisesReadPage} />
    </Switch>
  );
};
