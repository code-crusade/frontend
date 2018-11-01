import { Credentials } from './../auth/models';
// NOTE: All changes here must also be made in https://github.com/code-crusade/backend/blob/poc/src/main/java/com/etsmtl/codecrusade/entities/User.java

export interface User extends Credentials {
  readonly id: string;
  firstName: string;
  lastName: string;
}
