import { AuthApiMock } from './authApi';
import { DefaultApiMock } from './defaultApi';

export const MockApi = {
  defaultApi: new DefaultApiMock(),
  authApi: new AuthApiMock(),
};
