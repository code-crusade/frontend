import * as faker from 'faker';
import { User } from '../../modules/users/models';

const ids: { [key: string]: string } = {
  A: '589bd63c-bcd9-4a42-91b1-a581b5bee951',
  B: 'fcc253ee-2b82-4c24-86be-362959e0a01f',
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
    password: faker.internet.password(),
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

const items: { [key: string]: User } = Object.values(resources).reduce(
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
