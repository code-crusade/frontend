import * as React from 'react';
import * as ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store';
import { App } from './App';
import { history } from './store';

const mockStore = configureStore();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App store={mockStore({})} history={history} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
