import { createSelector } from 'reselect';
import { UsersState } from './reducers/usersReducer';

export const getUsers = (state: UsersState) => state.items;
export const getUserId = (state: UsersState, id: number) => id;
export const getUserById = createSelector(
  [getUsers, getUserId],
  (items, id) => items[id],
);
export const getUsersLoading = (state: UsersState) => state.loading;
export const getUsersError = (state: UsersState) => state.error;
