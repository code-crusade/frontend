// NOTE: All changes here must also be made in https://github.com/code-crusade/backend/blob/poc/src/main/java/com/etsmtl/codecrusade/entities/Exercise.java

import {
  Difficulties,
  FunctionReturnTypes,
  SupportedLanguages,
} from '../../config/enums';
import { IntlString } from '../../types/types';

export type Template = {
  className: string;
  functionName: string;
  functionReturnValue: any;
  functionReturnType: FunctionReturnTypes;
  args: Array<{ name: string; type: FunctionReturnTypes }>;
  prependedCode: { [lang in SupportedLanguages]: string };
  appendedCode: { [lang in SupportedLanguages]: string };
};

export type Exercise = {
  id: string;
  title: IntlString;
  description: IntlString;
  difficulty: Difficulties;
  sampleTestCases: TestCase[];
  template: Template;
};

export type ExerciseSubmission = {
  id: string;
  exerciseId: string;
  userId: string;
  code: string;
  createdAt: Date;
  language: SupportedLanguages;
};

export type TestCase = {
  it: string;
  assertions: Array<{
    inputArguments: Array<{
      type: FunctionReturnTypes;
      value: any;
    }>;
    expectedOutput: {
      type: FunctionReturnTypes;
      value: any;
    };
  }>;
};
