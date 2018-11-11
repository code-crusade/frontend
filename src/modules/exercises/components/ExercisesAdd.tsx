import { FormikProps } from 'formik';
import * as React from 'react';
import {
  Difficulties,
  Exercise,
  SupportedLanguages,
  SupportedType,
} from '../../../__generated__/api';
import { Err404 } from '../../../components/Err404';
import { Loading } from '../../../components/Loading';
import { Omit } from '../../../types/types';
import { ExercisesAddFormik } from './ExercisesAddFormik';

export type ExercisesReadProps = {
  onSubmit: (
    values: Omit<Exercise, 'id'>,
    props: FormikProps<Partial<Exercise>>,
  ) => void;
  loading: boolean;
  error: Error;
};

export const ExercisesAdd: React.SFC<ExercisesReadProps> = (props) => {
  if (props.loading) {
    return <Loading />;
  }
  if (props.error) {
    return <Err404 />;
  }
  return (
    <ExercisesAddFormik
      initialValues={{
        title: {
          fr: '',
          en: '',
        },
        description: {
          fr: '',
          en: '',
        },
        difficulty: Difficulties.EASY,
        template: {
          className: '',
          functionName: '',
          functionReturnType: SupportedType.STRING,
          functionReturnValue: '',
          params: [{ name: '', type: SupportedType.INT }],
          prependedCode: Object.values(SupportedLanguages).reduce(
            (carry, lang) => ({ ...carry, [lang]: '' }),
            {},
          ),
          appendedCode: Object.values(SupportedLanguages).reduce(
            (carry, lang) => ({ ...carry, [lang]: '' }),
            {},
          ),
        },
        sampleTestCases: [
          {
            it: '',
            assertions: [
              {
                inputArguments: [{ type: SupportedType.INT, value: '' }],
                expectedOutput: { type: SupportedType.STRING, value: '' },
              },
            ],
          },
        ],
      }}
      onSubmit={props.onSubmit}
    />
  );
};
