import { createSelector } from 'reselect';
import { ExercisesState } from './reducer';

export const getExercises = (state: ExercisesState) => state.items;
export const getExerciseId = (state: ExercisesState, id: string) => id;
export const getExerciseById = createSelector(
  [getExercises, getExerciseId],
  (items, id) => items[id],
);
export const getExercisesLoading = (state: ExercisesState) => state.loading;
export const getExercisesError = (state: ExercisesState) => state.error;
