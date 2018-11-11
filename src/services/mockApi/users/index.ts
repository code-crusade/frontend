import { of, throwError } from 'rxjs';
import { User } from '../../../__generated__/api';
import { Method, xhr } from '../../../helpers';
import { testUsers } from '../../../test/data';

export const browse = ({
  page = 0,
  size = 20,
  sort = 'asc',
}: {
  page?: number;
  size?: number;
  sort?: string;
}) => {
  return of({
    response: {
      data: { _embedded: { users: Object.values(testUsers.items) } },
    },
  });
};

export const read = (id: string) => {
  if (!testUsers.items[id]) {
    return throwError('Resource Not Found');
  }
  return of({
    response: {
      data: { _embedded: { users: testUsers.items[id] } },
    },
  });
};

export const add = (user: User) => {
  return xhr(Method.POST, '/users', user);
};
