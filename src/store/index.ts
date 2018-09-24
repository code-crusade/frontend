import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './root-epic';
import { rootReducer } from './root-reducer';

const epicMiddleware = createEpicMiddleware();

function configureStore(initialState?: {}) {
  const middlewares = [epicMiddleware];
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

  epicMiddleware.run(rootEpic);

  return createStore(rootReducer, initialState!, enhancer);
}

export const store = configureStore();
