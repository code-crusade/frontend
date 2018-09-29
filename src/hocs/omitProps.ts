import { omit } from 'lodash/fp';
import { mapProps } from 'recompose';

export const omitProps = (keys: string[]) =>
  mapProps((props: object) => omit(keys, props));
