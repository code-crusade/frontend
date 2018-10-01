import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';
import { history, store } from './store';

// Import styling
import 'normalize.css/normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css'; // tslint:disable-line
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

ReactDOM.render(
  <App store={store} history={history} />,
  document.getElementById('root'),
);
