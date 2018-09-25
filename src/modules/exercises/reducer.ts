import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import * as exercises from './actions';
import { Exercise } from './models';

export type ExercisesAction = ActionType<typeof exercises>;

export type ExercisesState = Readonly<{
  items: Exercise[];
  loading: boolean;
  error: Error | null;
}>;

export default combineReducers<ExercisesState, ExercisesAction>({
  error: (state = null, action) => {
    switch (action.type) {
      case getType(exercises.exercisesBrowse.request):
      case getType(exercises.exercisesRead.request):
      case getType(exercises.exercisesAdd.request):
      case getType(exercises.exercisesBrowse.success):
      case getType(exercises.exercisesRead.success):
      case getType(exercises.exercisesAdd.success):
        return null;
      case getType(exercises.exercisesBrowse.failure):
      case getType(exercises.exercisesRead.failure):
      case getType(exercises.exercisesAdd.failure):
        return action.payload;

      default:
        return state;
    }
  },
  // TODO: Add error and loading states to the reducer
  items: (state = [], action) => {
    switch (action.type) {
      case getType(exercises.exercisesBrowse.success):
        return [...state, ...action.payload];

      case getType(exercises.exercisesRead.success):
      case getType(exercises.exercisesAdd.success):
        return [...state, action.payload];

      default:
        return state;
    }
  },
  loading: (state = false, action) => {
    switch (action.type) {
      case getType(exercises.exercisesBrowse.request):
      case getType(exercises.exercisesRead.request):
      case getType(exercises.exercisesAdd.request):
        return true;

      case getType(exercises.exercisesBrowse.success):
      case getType(exercises.exercisesRead.success):
      case getType(exercises.exercisesAdd.success):
      case getType(exercises.exercisesBrowse.failure):
      case getType(exercises.exercisesRead.failure):
      case getType(exercises.exercisesAdd.failure):
        return false;

      default:
        return state;
    }
  },
});
