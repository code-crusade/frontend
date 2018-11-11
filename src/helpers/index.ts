import { camelCase, capitalize, snakeCase, upperFirst } from 'lodash';
import { ajax } from 'rxjs/ajax';
import {
  Argument,
  Exercise,
  SupportedLanguages,
  SupportedType,
  Template,
} from '../__generated__/api';
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
  const paramsAsString = template.params.reduce((carry, param, i) => {
    if (param.name === '') {
      return carry;
    }
    let type = convertToLangType(param.type, targetLang);
    type = type ? `${type} ` : '';
    return `${carry}${type}${param.name}${
      i < template.params.length - 1 ? ', ' : ''
    }`;
  }, '');

  const functionReturnType = convertToLangType(
    template.functionReturnType,
    targetLang,
  );

  let code = '';

  if (targetLang === SupportedLanguages.Python) {
    code += `def ${template.functionName}(${paramsAsString}):\n`;
    code += `    return ${template.functionReturnValue.toString()}\n`;
  }
  if (targetLang === SupportedLanguages.Cpp) {
    code += `${functionReturnType} ${snakeCase(
      template.functionName,
    )}(${paramsAsString})\n`;
    code += `{\n`;
    code += `    return ${template.functionReturnValue.toString()};\n`;
    code += `}\n`;
  }
  if (targetLang === SupportedLanguages.Java) {
    code += `public class ${template.className ||
      upperFirst(template.functionName)} {\n`;
    code += `    public static ${convertToLangType(
      template.functionReturnType,
      targetLang,
    )} ${template.functionName}(${paramsAsString}) {\n`;
    code += `        return ${template.functionReturnValue.toString()};\n`;
    code += `    }\n`;
    code += `}\n`;
  }
  if (targetLang === SupportedLanguages.Javascript) {
    code += `function ${camelCase(
      template.functionName,
    )}(${paramsAsString}) {\n`;
    code += `    return ${template.functionReturnValue.toString()};\n`;
    code += `}\n`;
  }

  return `${template.prependedCode[targetLang]}\n${code}\n${
    template.appendedCode[targetLang]
  }`;
};

const convertToLangType = (
  val: SupportedType,
  targetLang: SupportedLanguages,
) => {
  if (targetLang === SupportedLanguages.Java) {
    switch (val) {
      case SupportedType.FLOAT:
        return 'double';
      case SupportedType.FLOATARRAY:
        return 'double[]';
      case SupportedType.STRING:
      case SupportedType.STRINGARRAY:
        return capitalize(val);
      default:
        return val;
    }
  }
  if (targetLang === SupportedLanguages.Cpp) {
    /* tslint:disable-next-line */
    switch (val) {
      case SupportedType.STRING:
        return 'std::string';
      case SupportedType['INTARRAY']:
        return 'std::vector<int>';
      case SupportedType['BOOLEANARRAY']:
        return 'std::vector<boolean>';
      case SupportedType['FLOATARRAY']:
        return 'std::vector<float>';
      case SupportedType['STRINGARRAY']:
        return 'std::vector<std::string>';
      default:
        return val;
    }
  }
  return null;
};

export const generateTestsFromTestCases = (
  exercise: Exercise,
  targetLang: SupportedLanguages,
) => {
  const { template, sampleTestCases } = exercise;
  let code = '';

  if (targetLang === SupportedLanguages.Python) {
    return '';
  }
  if (targetLang === SupportedLanguages.Cpp) {
    return '';
  }
  if (targetLang === SupportedLanguages.Java) {
    return '';
  }
  if (targetLang === SupportedLanguages.Javascript) {
    code += `let assert = require("chai").assert;\n\n`;
    code += `describe('Challenge', function() {\n`;
    sampleTestCases.forEach((testCase) => {
      code += `    it('${testCase.it}', function() {\n`;
      testCase.assertions.forEach((assertion) => {
        code += `        assert.${getAssertionFn(
          assertion.expectedOutput,
        )}(${camelCase(template.functionName)}(`;
        code += assertion.inputArguments.reduce(
          (carry, inputArgument, i, arr) => {
            if (!inputArgument.value) {
              return carry;
            }
            return (
              carry +
              formatArg(inputArgument) +
              (arr.length - 1 === i ? '' : ', ')
            );
          },
          '',
        );
        code += `), ${formatArg(assertion.expectedOutput)});\n`;
      });
      code += `    });\n\n`;
    });
    code += '});\n';
  }

  return code;
};

export const getAssertionFn = (arg: Argument) => {
  switch (arg.type) {
    case SupportedType.FLOAT:
      return `'${arg.value}'`;
    case SupportedType['STRINGARRAY']:
      return JSON.parse(`[${arg.value}]`).map((s: string) =>
        s.replace('"', "'"),
      );
    default:
      return 'deepEqual';
  }
};

export const formatArg = (arg: Argument) => {
  switch (arg.type) {
    case SupportedType.STRING:
      return `'${arg.value}'`;
    case SupportedType['STRINGARRAY']:
      return JSON.parse(`[${arg.value}]`).map((s: string) =>
        s.replace('"', "'"),
      );
    default:
      return arg.value;
  }
};
