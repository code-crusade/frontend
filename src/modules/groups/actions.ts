import { createAsyncAction } from 'typesafe-actions';
import { Group } from './models';

export const groupsBrowse = createAsyncAction(
  'GROUPS_BROWSE_REQUEST',
  'GROUPS_BROWSE_SUCCESS',
  'GROUPS_BROWSE_FAILURE',
)<void, Group[], Error>();

export const groupsAdd = createAsyncAction(
  'GROUPS_ADD_REQUEST',
  'GROUPS_ADD_SUCCESS',
  'GROUPS_ADD_FAILURE',
)<Group, Group, Error>();
