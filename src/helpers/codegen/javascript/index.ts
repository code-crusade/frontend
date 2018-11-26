import { camelCase } from 'lodash';
import {
  Argument,
  Exercise,
  SupportedType,
  Template,
} from '../../../__generated__/api';

export const generateEntryPoint = (template: Template) => {
  const paramsAsString = template.params.reduce((carry, param, i) => {
    if (param.name === '') {
      return carry;
    }
    return `${carry}${param.name}${i < template.params.length - 1 ? ', ' : ''}`;
  }, '');

  let code = '';
  code += `function ${camelCase(template.functionName)}(${paramsAsString}) {\n`;
  code += `    return ${template.functionReturnValue.toString()};\n`;
  code += `}\n`;

  return code;
};

export const generateTests = (exercise: Exercise) => {
  const { template, sampleTestCases } = exercise;
  let code = '';

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
    code += `    });\n`;
  });
  code += '});\n';

  return code;
};

const getAssertionFn = (arg: Argument) => {
  switch (arg.type) {
    case SupportedType.FLOAT:
      return `closeTo`;
    case SupportedType.STRINGARRAY:
      return JSON.parse(`[${arg.value}]`).map((s: string) =>
        s.replace('"', "'"),
      );
    default:
      return 'deepEqual';
  }
};

const formatArg = (arg: Argument) => {
  switch (arg.type) {
    case SupportedType.STRING:
      return `'${arg.value}'`;
    case SupportedType.STRINGARRAY:
      return JSON.parse(`[${arg.value}]`).map((s: string) =>
        s.replace('"', "'"),
      );
    case SupportedType.INTARRAY:
    case SupportedType.FLOATARRAY:
      return `[${arg.value}]`;
    default:
      return arg.value;
  }
};
