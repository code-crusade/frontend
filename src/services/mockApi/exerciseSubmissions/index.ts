import { of, throwError } from 'rxjs';
import { ExerciseSubmission } from '../../../__generated__/api';
import { Method, xhr } from '../../../helpers';
import { testExerciseSubmissions } from '../../../test/data';

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
      data: {
        _embedded: {
          exerciseSubmissions: Object.values(testExerciseSubmissions.items),
        },
      },
    },
  });
};

export const read = (id: number) => {
  if (!testExerciseSubmissions.items[id]) {
    return throwError('Resource Not Found');
  }
  return of({
    response: {
      data: {
        _embedded: { exerciseSubmissions: testExerciseSubmissions.items[id] },
      },
    },
  });
};

export const add = (exerciseSubmission: ExerciseSubmission) => {
  return xhr(Method.POST, '/submissions', exerciseSubmission);
};
