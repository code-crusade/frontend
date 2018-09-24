import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';
import { history, store } from './store';

ReactDOM.render(
  <App store={store} history={history} />,
  document.getElementById('root')
);
