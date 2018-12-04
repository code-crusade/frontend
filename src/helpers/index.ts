import { ajax } from 'rxjs/ajax';
import { Exercise, SupportedLanguages, Template } from '../__generated__/api';
import { URL_API } from '../config';
import { Omit } from '../types/types';
import * as codegen from './codegen';

export enum Method {
  POST = 'POST',
  PATCH = 'PATCH',
  GET = 'GET',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

export const xhr = (method: Method, url: string, body?: object) => {
  const options = {
    body: JSON.stringify(body),
    crossDomain: true,
    headers: { 'Content-Type': 'application/json' },
    method,
    responseType: 'json',
    url: URL_API + url,
  };

  return ajax(options);
};

export const generateInitialCode = (
  template: Template,
  targetLang: SupportedLanguages,
) => {
  console.log(template);
  if (!template.functionName) {
    return 'Error: Function name is missing';
  }

  const code = codegen[targetLang].generateEntryPoint(template);

  return `${template.prependedCode[targetLang]}\n${code}\n${
    template.appendedCode[targetLang]
  }`;
};

export const generateTests = (
  exercise: Omit<Exercise, 'id' | 'fixtures'>,
  targetLang: SupportedLanguages,
) => {
  return codegen[targetLang].generateTests(exercise);
};

export const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
