import { GroupsState } from './reducers';

export const getGroups = (state: GroupsState) => state.items;
export const getGroupsLoading = (state: GroupsState) => state.loading;
export const getGroupsError = (state: GroupsState) => state.error;
