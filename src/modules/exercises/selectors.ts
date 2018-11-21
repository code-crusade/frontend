import { maxBy, pickBy } from 'lodash';
import { createSelector } from 'reselect';
import { RootState } from '../../store/root-reducer';
import { getLoggedInUser } from '../auth/selectors';
import { ExercisesState } from './reducers/exercisesReducer';
import { ExerciseSubmissionsState } from './reducers/exerciseSubmissionsReducer';

export const getExercisesState = (state: RootState) => state.exercises;
export const getExercises = (state: ExercisesState) => state.items;
export const getExerciseId = (state: any, exerciseId: number) => exerciseId;
export const getExerciseById = createSelector(
  [getExercises, getExerciseId],
  (items, id) => items[id],
);
export const getExercisesLoading = (state: ExercisesState) => state.loading;
export const getExercisesError = (state: ExercisesState) => state.error;

// Exercises submissions
export const getExerciseSubmissions = (state: RootState) =>
  state.exerciseSubmissions.items;
export const getExerciseSubmissionId = (
  state: ExerciseSubmissionsState,
  id: number,
) => id;
export const getExerciseSubmissionById = createSelector(
  [getExerciseSubmissions, getExerciseSubmissionId],
  (items, id) => items[id],
);
export const getExerciseSubmissionsByExerciseId = createSelector(
  [getExerciseSubmissions, getExerciseId],
  (exerciseSubmissions, exerciseId) =>
    pickBy(
      exerciseSubmissions,
      (exerciseSubmission) =>
        (exerciseSubmission as any).exerciseId === exerciseId, // FIXME: remove any
    ),
);
export const getExerciseSubmissionsLoading = (
  state: ExerciseSubmissionsState,
) => state.loading;
export const getExerciseSubmissionsError = (state: ExerciseSubmissionsState) =>
  state.error;

export const getMostRecentSubmissionOfUser = createSelector(
  [getExerciseSubmissionsByExerciseId, getLoggedInUser],
  (exerciseSubmissions, user) =>
    maxBy(
      Object.values(
        pickBy(
          exerciseSubmissions,
          (exerciseSubmission) =>
            user && (exerciseSubmission as any).userId === user.id, // FIXME: remove any
        ),
      ),
      'date',
    ),
);

export const getRunner = (state: RootState) => state.runner;
