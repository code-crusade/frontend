import { Group } from './../../__generated__/api/api';
import { Omit } from './../../types/types';

const items: { [key: number]: Group } = {};

const add = (formValues: Omit<Group, 'id'>) => {
  const id = Object.values(items).length + 1;
  const newItem = { ...formValues, id };

  items[id] = newItem;

  return newItem;
};

const archive = (group: Partial<Group>) => {
  const newItem = items[group.id!];
  if (newItem) {
    newItem.archived = group.archived!;
  }
  return newItem;
};

export const testGroups = {
  add,
  archive,
  items,
};
