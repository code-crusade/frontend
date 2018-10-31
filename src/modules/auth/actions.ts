import { createAsyncAction } from 'typesafe-actions';
import { User } from '../users/models';
import { Credentials } from './models';

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
