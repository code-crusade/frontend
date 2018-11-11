import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import { User } from '../../../__generated__/api';
import * as users from '../actions';

export type UsersAction = ActionType<typeof users>;

export type UsersState = Readonly<{
  items: { [key: string]: User };
  loading: boolean;
  error: Error | null;
}>;

export const usersReducer = combineReducers<UsersState, UsersAction>({
  error: (state = null, action) => {
    switch (action.type) {
      case getType(users.usersBrowse.request):
      case getType(users.usersRead.request):
      case getType(users.usersAdd.request):
      case getType(users.usersBrowse.success):
      case getType(users.usersRead.success):
      case getType(users.usersAdd.success):
        return null;
      case getType(users.usersBrowse.failure):
      case getType(users.usersRead.failure):
      case getType(users.usersAdd.failure):
        return action.payload;

      default:
        return state;
    }
  },
  items: (state = {}, action) => {
    switch (action.type) {
      case getType(users.usersBrowse.success):
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

      case getType(users.usersRead.success):
      case getType(users.usersAdd.success):
        return { ...state, [action.payload.id]: action.payload };

      default:
        return state;
    }
  },
  loading: (state = false, action) => {
    switch (action.type) {
      case getType(users.usersBrowse.request):
      case getType(users.usersRead.request):
      case getType(users.usersAdd.request):
        return true;

      case getType(users.usersBrowse.success):
      case getType(users.usersRead.success):
      case getType(users.usersAdd.success):
      case getType(users.usersBrowse.failure):
      case getType(users.usersRead.failure):
      case getType(users.usersAdd.failure):
        return false;

      default:
        return state;
    }
  },
});
