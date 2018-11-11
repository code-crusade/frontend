import { Omit } from 'react-redux';
import { of } from 'rxjs';
import * as uuid from 'uuid/v4';
import { Group } from '../../../__generated__/api';

export const groups: Group[] = [];

export const browse = () => {
  return of({
    response: {
      data: { _embedded: { groups: Object.values(groups) } },
    },
  });
};

const addGroup = (formValues: Omit<Group, 'id'>) => {
  const id = uuid();
  const newItem = { ...formValues, id };

  groups[id] = newItem;
  return newItem;
};

export const add = (group: Group) => {
  const res = addGroup(group);
  return of({
    response: {
      data: { _embedded: { group: res } },
    },
  });
};

export const archive = (payload: { groupId: string; archived: boolean }) => {
  const group = groups[payload.groupId];
  if (group) {
    group.archived = payload.archived;
  }

  return of({
    response: {
      data: { _embedded: { group } },
    },
  });
};
