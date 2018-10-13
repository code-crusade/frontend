// NOTE: All changes here must also be made in https://github.com/code-crusade/backend/blob/poc/src/main/java/com/etsmtl/codecrusade/entities/Exercise.java

import { SupportedLanguages } from '../../config/enums';
import { SupportedTypes } from '../../types/types';

export type Template = {
  className: string;
  functionName: string;
  functionReturnValue: any;
  functionReturnType: SupportedTypes;
  args: Array<{ name: string; type: SupportedTypes }>;
  languageSpecs?: {
    [lang in SupportedLanguages]: {
      prependedCode: string;
      appendedCode: string;
    }
  };
};

export type Exercise = {
  id: string;
  title: {
    fr: string;
    en: string;
  };
  description: {
    fr: string;
    en: string;
  };
  unitTests: any;
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
