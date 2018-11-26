import { ajax } from 'rxjs/ajax';
import { Exercise, SupportedLanguages, Template } from '../__generated__/api';
import { URL_API } from '../config';
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
  if (!template.functionName) {
    return 'Error: Function name is missing';
  }
  if (!template.functionReturnValue) {
    return 'Error: Function return value is missing';
  }

  const code = codegen[targetLang].generateEntryPoint(template);

  return `${template.prependedCode[targetLang]}\n${code}\n${
    template.appendedCode[targetLang]
  }`;
};

export const generateTests = (
  exercise: Exercise,
  targetLang: SupportedLanguages,
) => {
  return codegen[targetLang].generateTests(exercise);
};
