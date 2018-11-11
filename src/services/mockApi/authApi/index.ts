import { AuthApiInterface, Credentials } from '../../../__generated__/api';

export class AuthApiMock implements AuthApiInterface {
  authCasloginGet(ticket: string, options?: any): Promise<{}> {
    throw new Error("authCasloginGet mock hasn't been implemented");
  }

  authLoginPost(credentials: Credentials, options?: any): Promise<{}> {
    throw new Error("authLoginPost mock hasn't been implemented");
  }
}
