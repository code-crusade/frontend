/* tslint:disable:no-identical-functions */
import {
  CodeValidationReport,
  DefaultApiInterface,
  Exercise,
  ExerciseSubmission,
  Group,
  RunnerArguments,
  User,
} from '../../../__generated__/api';
import { testExercises, testExerciseSubmissions } from '../../../test/data';
import { Omit } from '../../../types/types';

export class DefaultApiMock implements DefaultApiInterface {
  exercisesExerciseIdGet(exerciseId: number, options?: any): Promise<Exercise> {
    return Promise.resolve(testExercises.items[exerciseId]);
  }

  exercisesExerciseIdSubmissionsGet(
    exerciseId: number,
    options?: any,
  ): Promise<ExerciseSubmission[]> {
    throw new Error(
      "exercisesExerciseIdSubmissionsGet mock hasn't been implemented",
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
    throw new Error("exercisesExerciseIdTestPost mock hasn't been implemented");
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

  groupsAdd(group: Omit<Group, 'id'>, options?: any): Promise<Group> {
    throw new Error("groupsAdd mock hasn't been implemented");
  }

  groupsBrowse(options?: any): Promise<Group[]> {
    throw new Error("groupsBrowse mock hasn't been implemented");
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
}