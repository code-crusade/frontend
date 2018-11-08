import { Omit } from 'react-redux';
import { of } from 'rxjs';
import { Group } from 'src/modules/groups/models';
import * as uuid from 'uuid/v4';

export const groups: Group[] = [];

const addGroup = (formValues: Omit<Group, 'id'>) => {
  const id = uuid();
  const newItem = { ...formValues, id };
  console.log(newItem);

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
