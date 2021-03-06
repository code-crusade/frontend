import { pickBy } from 'lodash';
import { GroupsState } from './reducers';

export const getGroups = (state: GroupsState) => state.items;
export const getGroupsLoading = (state: GroupsState) => state.loading;
export const getGroupsError = (state: GroupsState) => state.error;

export const getArchivedGroups = (state: GroupsState) =>
  pickBy(state.items, (group) => group.archived);

export const getCurrentGroups = (state: GroupsState) =>
  pickBy(state.items, (group) => !group.archived);
