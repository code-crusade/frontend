import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import { reducer } from './root-reducer';

function configureStore(initialState?: {}) {
  const middlewares = [createEpicMiddleware()];
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

  return createStore(reducer, initialState!, enhancer);
}

export const store = configureStore();
