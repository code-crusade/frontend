import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import { exercisesReducer } from '../modules/exercises';

export const rootReducer = combineReducers({
  exercises: exercisesReducer,
});

export type RootState = StateType<typeof rootReducer>;
