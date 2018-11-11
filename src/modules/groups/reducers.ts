import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import { Group } from '../../__generated__/api';
import * as groups from './actions';

export type GroupsAction = ActionType<typeof groups>;
export type GroupsState = Readonly<{
  items: { [key: string]: Group };
  loading: boolean;
  error: Error | null;
}>;

export const groupsReducer = combineReducers<GroupsState, GroupsAction>({
  items: (state = {}, action) => {
    switch (action.type) {
      case getType(groups.groupsAdd.success):
      case getType(groups.groupsArchive.success):
        return { ...state, [action.payload.id]: action.payload };
      default:
        return state;
    }
  },
  error: (state = null, action) => {
    switch (action.type) {
      case getType(groups.groupsBrowse.request):
      case getType(groups.groupsAdd.request):
      case getType(groups.groupsArchive.request):
      case getType(groups.groupsBrowse.success):
      case getType(groups.groupsAdd.success):
      case getType(groups.groupsArchive.success):
        return null;
      case getType(groups.groupsAdd.failure):
      case getType(groups.groupsArchive.failure):
        return action.payload;
      default:
        return state;
    }
  },
  loading: (state = false, action) => {
    switch (action.type) {
      case getType(groups.groupsBrowse.request):
      case getType(groups.groupsAdd.request):
      case getType(groups.groupsArchive.request):
        return true;
      case getType(groups.groupsBrowse.success):
      case getType(groups.groupsAdd.success):
      case getType(groups.groupsArchive.success):
      case getType(groups.groupsBrowse.failure):
      case getType(groups.groupsAdd.failure):
      case getType(groups.groupsArchive.failure):
        return false;
      default:
        return state;
    }
  },
});
