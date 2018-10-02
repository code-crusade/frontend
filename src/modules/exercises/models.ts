// NOTE: All changes here must also be made in https://github.com/code-crusade/backend/blob/poc/src/main/java/com/etsmtl/codecrusade/entities/Exercise.java

export type Exercise = {
  id: string;
  title: {
    fr: string;
    en: string;
  };
  description: {
    fr: string;
    en: string;
  };
  unitTests: any;
};

export type ExerciseSubmission = {
  id: string;
  exerciseId: string;
  userId: string;
  code: string;
};
