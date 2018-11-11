import { createAsyncAction } from 'typesafe-actions';
import { Credentials, User } from '../../__generated__/api';

export const authLogIn = createAsyncAction(
  'AUTH_LOG_IN_REQUEST',
  'AUTH_LOG_IN_SUCCESS',
  'AUTH_LOG_IN_FAILURE',
)<Credentials, User, Error>();

export const authLogOut = createAsyncAction(
  'AUTH_LOG_OUT_REQUEST',
  'AUTH_LOG_OUT_SUCCESS',
  'AUTH_LOG_OUT_FAILURE',
)<any, any, Error>();
