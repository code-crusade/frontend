import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './root-epic';
import { rootReducer } from './root-reducer';

export const history = createBrowserHistory();
const epicMiddleware = createEpicMiddleware();

function configureStore(initialState?: {}) {
  const middlewares = [epicMiddleware, routerMiddleware(history)];
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

  const newStore = createStore(
    connectRouter(history)(rootReducer),
    initialState!,
    enhancer
  );

  epicMiddleware.run(rootEpic);

  return newStore;
}

export const store = configureStore();
