import { createBrowserHistory, createMemoryHistory } from 'history';

export function getHistory() {
  return process.env.NODE_ENV === 'test'
    ? createMemoryHistory()
    : createBrowserHistory();
}

export const history = getHistory();
