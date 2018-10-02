import { ExerciseSubmission } from '../../modules/exercises/models';
import { Omit } from '../../types/types';
import { testExercises } from './exercises';

const ids: { [key: string]: string } = {
  A: '589bd63c-bcd9-4a42-91b1-a581b5bee951',
  B: 'fcc253ee-2b82-4c24-86be-362959e0a01f',
};

const partialResources: {
  [key: string]: Omit<ExerciseSubmission, 'code'>;
} = {};

Object.keys(ids).forEach((key) => {
  partialResources[key] = {
    exerciseId: testExercises.ids.A,
    id: ids[key],
    userId: '75f22660-7ca4-415e-aeb2-c4fc4c674364',
  };
});

const resources: { [key: string]: ExerciseSubmission } = {
  A: {
    ...partialResources.A,
    code: 'This was first submission',
  },
  B: {
    ...partialResources.B,
    code: "This is the sumbmission I'm working one (2nd one)",
  },
};

const items: { [key: string]: ExerciseSubmission } = Object.values(
  resources,
).reduce(
  (carry: object, resource: ExerciseSubmission) => ({
    ...carry,
    [resource.id]: resource,
  }),
  {},
);

export const testExerciseSubmissions = {
  ids,
  items,
  resources,
};
