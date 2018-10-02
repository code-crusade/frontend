import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import {
  exercisesReducer,
  exerciseSubmissionsReducer,
} from '../modules/exercises';

export const rootReducer = combineReducers({
  exerciseSubmissions: exerciseSubmissionsReducer,
  exercises: exercisesReducer,
});

export type RootState = StateType<typeof rootReducer>;
