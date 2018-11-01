import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import { User } from './../users/models';
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
    if (action.type === getType(auth.authLogIn.success)) {
      // TODO: Inject current user in reducer
      return state;
    }

    return state;
  },
  loading: (state = false, action) => {
    return state;
  },
});
