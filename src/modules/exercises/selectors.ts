import { createSelector } from 'reselect';
import { ExercisesState } from './reducers/exercisesReducer';
import { ExerciseSubmissionsState } from './reducers/exerciseSubmissionsReducer';

export const getExercises = (state: ExercisesState) => state.items;
export const getExerciseId = (state: ExercisesState, id: string) => id;
export const getExerciseById = createSelector(
  [getExercises, getExerciseId],
  (items, id) => items[id],
);
export const getExercisesLoading = (state: ExercisesState) => state.loading;
export const getExercisesError = (state: ExercisesState) => state.error;

// Exercises submissions
export const getExerciseSubmissions = (state: ExerciseSubmissionsState) =>
  state.items;
export const getExerciseSubmissionId = (
  state: ExerciseSubmissionsState,
  id: string,
) => id;
export const getExerciseSubmissionById = createSelector(
  [getExerciseSubmissions, getExerciseSubmissionId],
  (items, id) => items[id],
);
export const getExerciseSubmissionsLoading = (
  state: ExerciseSubmissionsState,
) => state.loading;
export const getExerciseSubmissionsError = (state: ExerciseSubmissionsState) =>
  state.error;
