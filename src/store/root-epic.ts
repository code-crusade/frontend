import { combineEpics } from 'redux-observable';
import { exercisesEpics } from '../modules/exercises';
export const rootEpic = combineEpics(exercisesEpics);
