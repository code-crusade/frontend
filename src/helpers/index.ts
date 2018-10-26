import { camelCase, capitalize, snakeCase } from 'lodash';
import { ajax } from 'rxjs/ajax';
import { URL_API } from '../config';
import { FunctionReturnTypes, SupportedLanguages } from '../config/enums';
import { Template } from '../modules/exercises/models';

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

export const generateCodeFromTemplate = (
  template: Template,
  targetLang: SupportedLanguages,
) => {
  if (!template.functionName) {
    return 'Error: Function name is missing';
  }
  if (!template.functionReturnValue) {
    return 'Error: Function return value is missing';
  }
  const argsAsString = template.args.reduce((carry, arg, i) => {
    if (arg.name === '') {
      return carry;
    }
    let type = convertToLangType(arg.type, targetLang);
    type = type ? `${type} ` : '';
    return `${carry}${type}${arg.name}${
      i < template.args.length - 1 ? ', ' : ''
    }`;
  }, '');

  const functionReturnType = convertToLangType(
    template.functionReturnType,
    targetLang,
  );

  let code = '';

  if (targetLang === SupportedLanguages.Python) {
    code += `def ${template.functionName}(${argsAsString}):\n`;
    code += `    return ${template.functionReturnValue.toString()}\n`;
  }
  if (targetLang === SupportedLanguages.Cpp) {
    code += `${functionReturnType} ${snakeCase(
      template.functionName,
    )}(${argsAsString})\n`;
    code += `{\n`;
    code += `    return ${template.functionReturnValue.toString()};\n`;
    code += `}\n`;
  }
  if (targetLang === SupportedLanguages.Java) {
    code += `public class ${template.className ||
      capitalize(template.functionName)} {\n`;
    code += `    public static ${convertToLangType(
      template.functionReturnType,
      targetLang,
    )} ${template.functionName}(${argsAsString}) {\n`;
    code += `        return ${template.functionReturnValue.toString()};\n`;
    code += `    }\n`;
    code += `}\n`;
  }
  if (targetLang === SupportedLanguages.Javascript) {
    code += `function ${camelCase(template.functionName)}(${argsAsString}) {\n`;
    code += `    return ${template.functionReturnValue.toString()};\n`;
    code += `}\n`;
  }

  return `${template.prependedCode[targetLang]}\n${code}\n${
    template.appendedCode[targetLang]
  }`;
};

const convertToLangType = (
  val: FunctionReturnTypes,
  targetLang: SupportedLanguages,
) => {
  if (targetLang === SupportedLanguages.Java) {
    switch (val) {
      case 'float':
        return 'double';
      case 'float[]':
        return 'double[]';
      case 'object':
      case 'object[]':
      case 'string':
      case 'string[]':
        return capitalize(val);
      default:
        return val;
    }
  }
  if (targetLang === SupportedLanguages.Cpp) {
    /* tslint:disable-next-line */
    switch (val) {
      case 'string':
        return 'std::string';
      case 'string[]':
        return 'std::string[]';
      default:
        return val;
    }
  }
  return null;
};
