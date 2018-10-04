import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import * as services from '../services';
import { rootEpic } from './root-epic';
import { rootReducer } from './root-reducer';

export const history = createBrowserHistory();
// Configure redux-logger
// https://www.npmjs.com/package/redux-logger#options
const logger = createLogger({
  collapsed: true,
});
const epicMiddleware = createEpicMiddleware({
  // Dependencies are accessed as the third parameter when declaring an epic
  dependencies: services,
});

function configureStore(initialState?: {}) {
  const middlewares = [logger, epicMiddleware, routerMiddleware(history)];
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

  const newStore = createStore(
    connectRouter(history)(rootReducer),
    initialState!,
    enhancer,
  );

  epicMiddleware.run(rootEpic);

  return newStore;
}

export const store = configureStore();
