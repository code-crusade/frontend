// NOTE: All changes here must also be made in https://github.com/code-crusade/backend/blob/poc/src/main/java/com/etsmtl/codecrusade/entities/User.java

import { User } from '../users/models';

export type Auth = {
  user: User;
};
