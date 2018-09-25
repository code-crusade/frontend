import { ajax } from 'rxjs/ajax';
import { URL_API } from '../config';

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
