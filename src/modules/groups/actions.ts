import { createAsyncAction } from 'typesafe-actions';
import { Group } from './models';

export const groupsAdd = createAsyncAction(
  'GROUPS_ADD_REQUEST',
  'GROUPS_ADD_SUCCESS',
  'GROUPS_ADD_FAILURE',
)<Group, Group, Error>();
