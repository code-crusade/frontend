import { of, throwError } from 'rxjs';
import { Exercise } from '../../../modules/exercises/models';
import { testExercises } from '../../../test/data';
import { Omit } from '../../../types/types';

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

export const add = (exercise: Omit<Exercise, 'id'>) => {
  const res = testExercises.add(exercise);
  return of({
    response: {
      data: { _embedded: { exercise: res } },
    },
  });
};
