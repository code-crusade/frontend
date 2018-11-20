/* tslint:disable:no-identical-functions */
import { pickBy } from 'lodash';
import {
  CodeValidationReport,
  DefaultApiInterface,
  Exercise,
  ExerciseSubmission,
  Group,
  RunnerArguments,
  User,
} from '../../../__generated__/api';
import {
  testExercises,
  testExerciseSubmissions,
  testGroups,
} from '../../../test/data';
import { Omit } from '../../../types/types';

export class DefaultApiMock implements DefaultApiInterface {
  exercisesExerciseIdGet(exerciseId: number, options?: any): Promise<Exercise> {
    return Promise.resolve(testExercises.items[exerciseId]);
  }

  exercisesExerciseIdSubmissionsGet(
    exerciseId: number,
    options?: any,
  ): Promise<ExerciseSubmission[]> {
    return Promise.resolve(
      Object.values(
        pickBy(
          testExerciseSubmissions.items,
          (exerciseSubmission) => exerciseSubmission.exerciseId === exerciseId,
        ),
      ),
    );
  }

  exercisesExerciseIdSubmissionsPost(
    exerciseId: number,
    runnerArguments: RunnerArguments,
    options?: any,
  ): Promise<{}> {
    throw new Error(
      "exercisesExerciseIdSubmissionsPost mock hasn't been implemented",
    );
  }

  exercisesExerciseIdSubmissionsSubmissionIdGet(
    exerciseId: number,
    submissionId: number,
    options?: any,
  ): Promise<ExerciseSubmission> {
    return Promise.resolve(testExerciseSubmissions.items[submissionId]);
  }

  exercisesExerciseIdSubmissionsSubmissionIdResultsGet(
    exerciseId: number,
    submissionId: number,
    options?: any,
  ): Promise<CodeValidationReport> {
    throw new Error(
      "exercisesExerciseIdSubmissionsSubmissionIdResultsGet mock hasn't been implemented",
    );
  }

  exercisesExerciseIdTestPost(
    exerciseId: number,
    runnerArguments: RunnerArguments,
    options?: any,
  ): Promise<CodeValidationReport> {
    return Promise.resolve({
      exerciseId,
      exitCode: 0,
      message: '',
      result: {
        assertions: { passed: 0, failed: 3 },
        completed: false,
        output: [
          {
            passed: false,
            text: testExercises.items[exerciseId].template.functionName,
            items: testExercises.items[exerciseId].sampleTestCases.map(
              (testCase) => ({
                text: testCase.it,
                passed: false,
                items: testCase.assertions.map((assertion) => ({
                  message: `Expected: '${
                    assertion.expectedOutput.value
                  }', instead got: '2016-11-22'`,
                  passed: false,
                })),
              }),
            ),
          },
        ],
      },
      stderr:
        "Unhandled rejection TestError: Expected: '2024-07-03', instead got: '2016-11-22'",
      stdout: '\nTest log',
      timedOut: false,
      token: '',
      executionTime: 500,
    });
  }

  exercisesIndex(options?: any): Promise<Exercise[]> {
    return Promise.resolve(Object.values(testExercises.items));
  }

  runCodeForExercise(
    exerciseId: number,
    runnerArguments: RunnerArguments,
    options?: any,
  ): Promise<{}> {
    return Promise.resolve({});
  }

  exercisesAdd(
    exercise: Omit<Exercise, 'id'>,
    options?: any,
  ): Promise<Exercise> {
    const res = testExercises.add(exercise);

    return Promise.resolve(res);
  }

  groupsBrowse(options?: any): Promise<Group[]> {
    return Promise.resolve(Object.values(testGroups.items));
  }

  groupsAdd(group: Omit<Group, 'id'>, options?: any): Promise<Group> {
    const res = testGroups.add(group);
    return Promise.resolve(res);
  }

  usersAdd(user: User, options?: any): Promise<User> {
    throw new Error("usersAdd mock hasn't been implemented");
  }

  usersBrowse(options?: any): Promise<User[]> {
    throw new Error("usersBrowse mock hasn't been implemented");
  }

  usersRead(userId: number, options?: any): Promise<User> {
    throw new Error("usersRead mock hasn't been implemented");
  }

  groupsEdit(group: Partial<Group>, options?: any): Promise<Group> {
    const res = testGroups.archive(group); // Just archive for the moment
    return Promise.resolve(res);
  }
}
