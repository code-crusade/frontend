import { Method, xhr } from '../../../helpers';
import { Exercise } from '../../../modules/exercises/models';

export const browse = ({
  page = 0,
  size = 20,
  sort = 'asc',
}: {
  page?: number;
  size?: number;
  sort?: string;
}) => {
  return xhr(Method.GET, '/exercises');
};

export const read = (id: string) => {
  return xhr(Method.GET, `/exercises/${id}`);
};

export const add = (exercise: Exercise) => {
  return xhr(Method.POST, '/exercises', exercise);
};
