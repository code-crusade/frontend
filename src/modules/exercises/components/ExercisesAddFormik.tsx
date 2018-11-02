import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';
import { Omit } from '../../../types/types';
import { Exercise } from '../models';
import { ExercisesAddForm } from './ExercisesAddForm';

export type FormValues = Omit<Exercise, 'id'>;

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
          functionReturnValue: Yup.string().required('Requis'),
          params: Yup.array(
            Yup.object().shape({
              name: Yup.string().required('Requis'),
            }),
          ),
        }),
      })}
      validate={(values) => console.log(values)}
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      render={(formikProps: FormikProps<FormValues>) => (
        <ExercisesAddForm {...formikProps} />
      )}
    />
  );
};
