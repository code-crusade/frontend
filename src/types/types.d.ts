// Here will be our custom generic types
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type SupportedTypes =
  | 'boolean'
  | 'boolean[]'
  | 'int'
  | 'int[]'
  | 'string'
  | 'string[]'
  | 'object'
  | 'object[]'
  | 'float'
  | 'float[]';
