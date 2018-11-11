import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import { Exercise } from '../../../__generated__/api';
import * as exercises from '../actions';

export type ExercisesAction = ActionType<typeof exercises>;

export type ExercisesState = Readonly<{
  items: { [key: number]: Exercise };
  loading: boolean;
  error: Error | null;
}>;

export const exercisesReducer = combineReducers<
  ExercisesState,
  ExercisesAction
>({
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
  items: (state = {}, action) => {
    switch (action.type) {
      case getType(exercises.exercisesBrowse.success):
        return {
          ...state,
          ...action.payload.reduce(
            (carry, item) => ({
              ...carry,
              [item.id]: item,
            }),
            {},
          ),
        };

      case getType(exercises.exercisesRead.success):
      case getType(exercises.exercisesAdd.success):
        return { ...state, [action.payload.id]: action.payload };

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
