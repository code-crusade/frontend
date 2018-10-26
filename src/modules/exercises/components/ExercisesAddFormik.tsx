import { Formik, FormikProps, FormikValues } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';
import { Omit } from '../../../types/types';
import { Exercise } from '../models';
import { ExercisesAddForm } from './ExercisesAddForm';

export type ExercisesAddFormikProps = {
  onSubmit: (
    values: Omit<Exercise, 'id'>,
    props: FormikProps<Partial<Exercise>>,
  ) => void;
  initialValues: FormikValues;
};

export const ExercisesAddFormik: React.SFC<ExercisesAddFormikProps> = (
  props,
) => {
  return (
    <Formik
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
          functionReturnValue: Yup.string().required('Requis'),
          args: Yup.array(
            Yup.object().shape({
              name: Yup.string().required('Requis'),
            }),
          ),
        }),
      })}
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      render={(formikProps: FormikProps<Exercise>) => (
        <ExercisesAddForm {...formikProps} />
      )}
    />
  );
};
