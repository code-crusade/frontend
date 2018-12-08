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
    let type = formatType(param.type);
    type = type ? `${type} ` : '';
    return `${carry}${type}${param.name}${
      i < template.params.length - 1 ? ', ' : ''
    }`;
  }, '');

  let code = '';
  code += `${formatType(template.functionReturnType)} ${snakeCase(
    template.functionName,
  )}(${paramsAsString})\n`;
  code += `{\n`;
  code += `    // Votre code ici\n`;
  code += `}\n`;

  return code;
};

const formatType = (type: SupportedType) => {
  switch (type) {
    case SupportedType.STRING:
      return 'std::string';
    case SupportedType.INTARRAY:
      return 'std::vector<int>';
    case SupportedType.BOOLEANARRAY:
      return 'std::vector<boolean>';
    case SupportedType.FLOATARRAY:
      return 'std::vector<float>';
    case SupportedType.STRINGARRAY:
      return 'std::vector<std::string>';
    case SupportedType.CHARARRAY:
      return 'std::vector<char>';
    default:
      return type.toLowerCase();
  }
};

export const generateTests = (exercise: Omit<Exercise, 'id' | 'fixtures'>) => {
  const { template, sampleTestCases } = exercise;

  // Using igloo framework (https://github.com/joakimkarlsson/igloo)
  let code = '';

  code += '#include <igloo/igloo_alt.h>\n';
  code += 'using namespace igloo;\n\n';

  code += `Describe(${snakeCase(exercise.title.fr)})\n{\n`;
  sampleTestCases.forEach((testCase) => {
    code += `\tIt(${snakeCase(testCase.it)})\n\t{\n`;
    // Initialize vectors if test case has arrays
    testCase.assertions.forEach((assertion, i) => {
      code += assertion.inputArguments.reduce((carry, arg, j) => {
        if (arg.type.includes('ARRAY')) {
          return `${carry}\t\t${formatType(arg.type)} arg_${i}${j} = {${
            arg.value
          }};\n`;
        }
        return carry;
      }, '');
      if (assertion.expectedOutput.type.includes('ARRAY')) {
        code += `\t\t${formatType(
          assertion.expectedOutput.type,
        )} res${i} = {${assertion.expectedOutput.value.toString()}};\n`;
      }
      code += `\t\tAssert::That(${template.functionName}(`;
      code += assertion.inputArguments.reduce((carry, arg, j, arr) => {
        if (!arg.value) {
          return carry;
        }
        return (
          carry +
          (formatArg(arg) || `arg_${i}${j}`) +
          (j === arr.length - 1 ? '' : ', ')
        );
      }, '');
      code += `), ${getAssertionFn(assertion.expectedOutput)}`;
      const res = `res${i}`;
      code += `${formatArg(assertion.expectedOutput) || res}));\n`;
    });
    code += '\t};\n';
  });
  code += `};\n\n`;

  code += 'int main(int argc, const char *argv[])\n{\n';
  code += '\treturn TestRunner::RunAllTests(argc, argv);\n';
  code += '}';
  return code;
};

const getAssertionFn = (arg: Argument) => {
  switch (arg.type) {
    default:
      return 'Equals(';
  }
};

const formatArg = (arg: Argument) => {
  switch (arg.type) {
    case SupportedType.STRING:
      return `"${arg.value}"`;
    case SupportedType.INTARRAY:
    case SupportedType.FLOATARRAY:
    case SupportedType.BOOLEANARRAY:
    case SupportedType.CHARARRAY:
    case SupportedType.STRINGARRAY:
      return null;
    default:
      return arg.value;
  }
};
