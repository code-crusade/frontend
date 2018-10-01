// Here will be our custom generic types
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
