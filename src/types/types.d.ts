import { push } from 'connected-react-router';

// Here will be our custom generic types
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type IntlString = {
  fr: string;
  en: string;
};

export interface BaseComponentProps {
  loading: boolean;
  error: Error;
}

export interface WithHistory {
  history: typeof push;
}
