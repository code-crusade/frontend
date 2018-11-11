import { createAsyncAction } from 'typesafe-actions';
import { User } from '../../__generated__/api';

export const usersBrowse = createAsyncAction(
  'USERS_BROWSE_REQUEST',
  'USERS_BROWSE_SUCCESS',
  'USERS_BROWSE_FAILURE',
)<void, User[], Error>();

export const usersRead = createAsyncAction(
  'USERS_READ_REQUEST',
  'USERS_READ_SUCCESS',
  'USERS_READ_FAILURE',
)<number, User, Error>();

export const usersAdd = createAsyncAction(
  'USERS_ADD_REQUEST',
  'USERS_ADD_SUCCESS',
  'USERS_ADD_FAILURE',
)<User, User, Error>();
