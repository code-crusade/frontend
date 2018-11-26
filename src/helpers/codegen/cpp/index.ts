import { snakeCase } from 'lodash';
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
  code += `    return ${template.functionReturnValue.toString()};\n`;
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
    default:
      return type.toLowerCase();
  }
};

export const generateTests = (exercise: Exercise) => {
  const { template, sampleTestCases } = exercise;

  // Using igloo framework (https://github.com/joakimkarlsson/igloo)
  let code = '';

  code += '#include <igloo/igloo_alt.h>\n';
  code += 'using namespace igloo;\n\n';

  code += `Describe(${snakeCase(exercise.title.fr)})\n{\n`;
  sampleTestCases.forEach((testCase) => {
    code += `\tIt(${snakeCase(testCase.it)})\n\t{\n`;
    testCase.assertions.forEach((assertion) => {
      code += `\t\tAssert::That(${template.functionName}(`;
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
      code += `), ${getAssertionFn(assertion.expectedOutput)}`;
      code += `${formatArg(assertion.expectedOutput)}));\n`;
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
    case SupportedType.STRINGARRAY:
      return JSON.parse(`[${arg.value}]`);
    case SupportedType.INTARRAY:
    case SupportedType.FLOATARRAY:
      return `[${arg.value}]`;
    default:
      return arg.value;
  }
};
