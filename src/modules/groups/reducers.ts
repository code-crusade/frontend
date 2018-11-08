import { combineReducers } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import * as groups from './actions';
import { Group } from './models';

export type GroupsAction = ActionType<typeof groups>;
type GroupsState = Readonly<{
  items: { [key: string]: Group };
  loading: boolean;
  error: Error | null;
}>;

export const groupsReducer = combineReducers<GroupsState, GroupsAction>({
  items: (state = {}, action) => {
    // tslint:disable-next-line
    switch (action.type) {
      case getType(groups.groupsAdd.success):
        return { ...state, [action.payload.id]: action.payload };
      default:
        return state;
    }
  },
  error: (state = null, action) => {
    switch (action.type) {
      case getType(groups.groupsAdd.request):
      case getType(groups.groupsAdd.success):
        return null;
      case getType(groups.groupsAdd.failure):
        return action.payload;
      default:
        return state;
    }
  },
  loading: (state = false, action) => {
    switch (action.type) {
      case getType(groups.groupsAdd.request):
        return true;
      case getType(groups.groupsAdd.success):
      case getType(groups.groupsAdd.failure):
        return false;
      default:
        return state;
    }
  },
});
