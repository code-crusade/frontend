import { combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';
import { User } from '../users/models';
import * as auth from './actions';

export type AuthAction = ActionType<typeof auth>;

export type AuthState = Readonly<{
  user: User | null;
  loading: boolean;
  error: Error | null;
}>;

export const authReducer = combineReducers<AuthState, AuthAction>({
  error: (state = null, action) => {
    return state;
  },
  user: (state = null, action) => {
    return state;
  },
  loading: (state = false, action) => {
    return state;
  },
});
