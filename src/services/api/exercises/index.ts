import { Exercise } from '../../../__generated__/api';
import { Method, xhr } from '../../../helpers';

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

export const read = (id: number) => {
  return xhr(Method.GET, `/exercises/${id}`);
};

export const add = (exercise: Exercise) => {
  return xhr(Method.POST, '/exercises', exercise);
};
