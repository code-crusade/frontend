import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';
import { Exercise } from '../../../__generated__/api';
import { Omit } from '../../../types/types';
import { ExercisesAddForm } from './ExercisesAddForm';

export type FormValues = Omit<Exercise, 'id' | 'fixtures'>;

export type ExercisesAddFormikProps = {
  onSubmit: (values: FormValues, props: FormikProps<FormValues>) => void;
  initialValues: FormValues;
};

export const ExercisesAddFormik: React.SFC<ExercisesAddFormikProps> = (
  props,
) => {
  return (
    <Formik<FormValues>
      validationSchema={Yup.object().shape({
        title: Yup.object().shape({
          en: Yup.string(),
          fr: Yup.string()
            .required('Requis')
            .max(50, 'Trop long!'),
        }),
        description: Yup.object().shape({
          en: Yup.string(),
          fr: Yup.string().required('Requis'),
        }),
        template: Yup.object().shape({
          functionName: Yup.string().required('Requis'),
          className: Yup.string(),
          params: Yup.array(
            Yup.object().shape({
              name: Yup.string().required('Requis'),
            }),
          ),
        }),
      })}
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      render={(formikProps: FormikProps<FormValues>) => (
        <ExercisesAddForm {...formikProps} />
      )}
    />
  );
};
