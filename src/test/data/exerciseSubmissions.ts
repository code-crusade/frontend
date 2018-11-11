// tslint:disable:prefer-template

import * as faker from 'faker';
import {
  ExerciseSubmission,
  SupportedLanguages,
} from '../../__generated__/api';
import { Omit } from '../../types/types';
import { testExercises } from './exercises';
import { testUsers } from './users';

const ids: { [key: string]: number } = {
  A: 1,
  B: 2,
};

const partialResources: {
  [key: string]: Omit<ExerciseSubmission, 'code'>;
} = {};

Object.keys(ids).forEach((key) => {
  partialResources[key] = {
    createdAt: faker.date.recent(),
    exerciseId: testExercises.ids.A,
    id: ids[key],
    userId: testUsers.ids.A,
    language: SupportedLanguages.Python,
  };
});

const resources: { [key: string]: ExerciseSubmission } = {
  A: {
    ...partialResources.A,
    code:
      'def maxSequence(arr):\n' +
      '    print(arr)\n' +
      '    maxSum = 0\n' +
      '    sum    = 0\n' +
      '    for v in arr:\n' +
      '        sum += v\n' +
      '        if sum < 0:\n' +
      '            sum = 0\n' +
      '        if sum > maxSum:\n' +
      '            maxSum = sum\n' +
      '    return maxSum\n',
  },
  B: {
    ...partialResources.B,
    code: "This is the submission I'm working one (2nd one)",
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
