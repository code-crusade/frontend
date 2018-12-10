import * as _Api from './api';
import { history } from './historyService';
import { MockApi } from './mockApi';

export const Api = process.env.REACT_APP_USE_TEST_DATA ? MockApi : _Api;

export { history };

export type Services = {
  Api: typeof MockApi;
  history: typeof history;
};
