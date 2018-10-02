import { of, throwError } from 'rxjs';
import { Method, xhr } from '../../../helpers';
import { Exercise } from '../../../modules/exercises/models';
import { testExercises } from '../../../test/data/exercises';

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
      data: { _embedded: { exercises: Object.values(testExercises.items) } },
    },
  });
};

export const read = (id: string) => {
  if (!testExercises.items[id]) {
    return throwError('Resource Not Found');
  }
  return of({
    response: {
      data: { _embedded: { exercises: testExercises.items[id] } },
    },
  });
};

export const add = (exercise: Exercise) => {
  return xhr(Method.POST, '/exercises', exercise);
};
