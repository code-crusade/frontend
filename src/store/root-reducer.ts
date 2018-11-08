import { combineReducers } from 'redux';
import { groupsReducer } from 'src/modules/groups/reducers';
import { StateType } from 'typesafe-actions';
import { authReducer } from '../modules/auth/reducer';
import {
  exercisesReducer,
  exerciseSubmissionsReducer,
} from '../modules/exercises';
import { usersReducer } from '../modules/users';

export const rootReducer = combineReducers({
  auth: authReducer,
  exerciseSubmissions: exerciseSubmissionsReducer,
  exercises: exercisesReducer,
  groups: groupsReducer,
  users: usersReducer,
});

export type RootState = StateType<typeof rootReducer>;
