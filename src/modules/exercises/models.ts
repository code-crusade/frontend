// NOTE: All changes here must also be made in https://github.com/code-crusade/backend/blob/poc/src/main/java/com/etsmtl/codecrusade/entities/Exercise.java

export type Exercise = {
  id: string;
  title: string;
  description: string;
  unitTests: any;
};
