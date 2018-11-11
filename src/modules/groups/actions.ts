import { Group } from 'src/__generated__/api';
import { createAsyncAction } from 'typesafe-actions';

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
