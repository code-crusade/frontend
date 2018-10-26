// NOTE: All changes here must also be made in https://github.com/code-crusade/backend/blob/poc/src/main/java/com/etsmtl/codecrusade/entities/User.java

export type User = {
  readonly id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
