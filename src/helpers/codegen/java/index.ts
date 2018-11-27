import { camelCase, capitalize, upperFirst } from 'lodash';
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
  code += `public class ${template.className ||
    upperFirst(template.functionName)} {\n`;
  code += `    public static ${formatType(template.functionReturnType)} ${
    template.functionName
  }(${paramsAsString}) {\n`;
  code += `        return ${template.functionReturnValue.toString()};\n`;
  code += `    }\n`;
  code += `}\n`;

  return code;
};

const formatType = (type: SupportedType) => {
  switch (type) {
    case SupportedType.INT:
      return 'int';
    case SupportedType.INTARRAY:
      return 'int[]';
    case SupportedType.FLOAT:
      return 'double';
    case SupportedType.FLOATARRAY:
      return 'double[]';
    case SupportedType.STRING:
    case SupportedType.STRINGARRAY:
      return capitalize(type);
    default:
      return type;
  }
};

export const generateTests = (exercise: Omit<Exercise, 'id'>) => {
  const { template, sampleTestCases } = exercise;

  // https://github.com/Codewars/codewars-runner-cli/blob/master/frameworks/java/src/main/java/ExampleTest.java
  let code = '';

  code += 'import static org.junit.Assert.assertEquals;\n';
  code += 'import org.junit.Test;\n';
  code += 'import org.junit.runners.JUnit4;\n';
  code += 'import static org.junit.Assert.assertEquals;\n\n';

  code += `public class ${upperFirst(camelCase(exercise.title.fr))} {\n`;
  sampleTestCases.forEach((testCase) => {
    code += '\t@Test\n';
    code += `\tpublic void ${camelCase(testCase.it)}() {\n`;
    testCase.assertions.forEach((assertion) => {
      code += `\t\t${getAssertionFn(assertion.expectedOutput)}("failure", ${
        template.functionName
      }(`;
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
      code += `), ${formatOutput(assertion.expectedOutput)});\n`;
    });
    code += '\t};\n';
  });
  code += `};\n\n`;
  return code;
};

const getAssertionFn = (arg: Argument) => {
  switch (arg.type) {
    default:
      return 'assertEquals';
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

const formatOutput = (arg: Argument) => {
  switch (arg.type) {
    case SupportedType.FLOAT:
      return `${arg.value}, 0.01`;
    default:
      return formatArg(arg);
  }
};
