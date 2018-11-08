import { combineEpics } from 'redux-observable';
import { authEpics } from '../modules/auth';
import { exercisesEpics } from '../modules/exercises';
import { groupsEpics } from '../modules/groups';
import { usersEpics } from '../modules/users';

export const rootEpic = combineEpics(
  exercisesEpics,
  usersEpics,
  authEpics,
  groupsEpics,
);
