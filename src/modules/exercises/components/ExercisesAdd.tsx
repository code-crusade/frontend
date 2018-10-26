import { FormikProps } from 'formik';
import * as React from 'react';
import { Err404 } from '../../../components/Err404';
import { Loading } from '../../../components/Loading';
import {
  Difficulties,
  FunctionReturnTypes,
  SupportedLanguages,
} from '../../../config/enums';
import { Omit } from '../../../types/types';
import { Exercise } from '../models';
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
    <React.Fragment>
      <h1>Nouvel exercice</h1>
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
            functionName: '',
            functionReturnType: FunctionReturnTypes.STRING,
            functionReturnValue: '',
            args: [{ name: '', type: FunctionReturnTypes.INT }],
            prependedCode: Object.values(SupportedLanguages).reduce(
              (carry, lang) => ({ ...carry, [lang]: '' }),
              {},
            ),
            appendedCode: Object.values(SupportedLanguages).reduce(
              (carry, lang) => ({ ...carry, [lang]: '' }),
              {},
            ),
          },
        }}
        onSubmit={props.onSubmit}
      />
    </React.Fragment>
  );
};
