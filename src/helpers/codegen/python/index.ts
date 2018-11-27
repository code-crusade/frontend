import { snakeCase } from 'lodash';
import {
  Argument,
  Exercise,
  SupportedType,
  Template,
} from '../../../__generated__/api';
import { Omit } from '../../../types/types';

export const generateEntryPoint = (template: Template) => {
  const paramsAsString = template.params.reduce((carry, param, i) => {
    if (param.name === '') {
      return carry;
    }
    return `${carry}${param.name}${i < template.params.length - 1 ? ', ' : ''}`;
  }, '');

  let code = '';
  code += `def ${template.functionName}(${paramsAsString}):\n`;
  code += `    return ${template.functionReturnValue.toString()}\n`;

  return code;
};

export const generateTests = (exercise: Omit<Exercise, 'id'>) => {
  const { template, sampleTestCases } = exercise;

  let code = '';
  code += 'import unittest\n\n';

  code += 'class TestPy(unittest.TestCase):\n\n';

  code += '\tdef setUp(self):\n';
  code += '\t\tpass\n\n';

  sampleTestCases.forEach((testCase) => {
    code += `\tdef ${snakeCase(testCase.it)}(self):\n`;
    testCase.assertions.forEach((assertion) => {
      code += `\t\tself.${getAssertionFn(assertion.expectedOutput)}(${snakeCase(
        template.functionName,
      )}(`;
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
      code += `), ${formatArg(assertion.expectedOutput)})\n`;
    });
    code += `\n`;
  });

  code += "if __name__ == '__main__':\n";
  code += '    unittest.main()\n';

  return code;
};

const getAssertionFn = (arg: Argument) => {
  // https://kapeli.com/cheat_sheets/Python_unittest_Assertions.docset/Contents/Resources/Documents/index
  switch (arg.type) {
    case SupportedType.FLOAT:
      return `assertAlmostEqual`;
    case SupportedType.STRINGARRAY:
      return JSON.parse(`[${arg.value}]`).map((s: string) =>
        s.replace('"', "'"),
      );
    default:
      return 'assertEqual';
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
