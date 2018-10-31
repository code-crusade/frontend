import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import 'normalize.css/normalize.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';
import { history, store } from './store';

ReactDOM.render(
  <App store={store} history={history} />,
  document.getElementById('root'),
);
