import * as faker from 'faker';
import { User } from '../../__generated__/api';

const ids: { [key: string]: number } = {
  A: 1,
  B: 2,
};

const partialResources: {
  [key: string]: User;
} = {};

Object.keys(ids).forEach((key) => {
  partialResources[key] = {
    id: ids[key],
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    accessCode: faker.internet.password(),
  };
});

const resources: { [key: string]: User } = {
  A: {
    ...partialResources.A,
  },
  B: {
    ...partialResources.B,
  },
};

const items: { [key: number]: User } = Object.values(resources).reduce(
  (carry: object, resource: User) => ({
    ...carry,
    [resource.id]: resource,
  }),
  {},
);

export const testUsers = {
  ids,
  items,
  resources,
};
