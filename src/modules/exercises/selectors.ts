import { ExercisesState } from './reducer';

export const getExercises = (state: ExercisesState) => state.items;
export const getExercisesLoading = (state: ExercisesState) => state.loading;
export const getExercisesError = (state: ExercisesState) => state.error;
