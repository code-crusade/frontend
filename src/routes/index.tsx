import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Home } from '../modules/home';

export class Routes extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </React.Fragment>
    );
  }
}
