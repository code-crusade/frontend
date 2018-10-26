import { Formik, FormikProps, FormikValues } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';
import { Credentials } from '../models';
import { LoginForm } from './LoginForm';

export type OnSubmitLogin = {
  onSubmit: (
    values: Credentials,
    props: FormikProps<Partial<Credentials>>,
  ) => void;
};

type LoginFormikProps = OnSubmitLogin & {
  initialValues: FormikValues;
};

// Login Validation Schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email invalide')
    .required('requis'),
  password: Yup.string().required('requis'),
});

export const LoginFormik: React.SFC<LoginFormikProps> = (props) => {
  return (
    <Formik
      initialValues={props.initialValues}
      validationSchema={LoginSchema}
      onSubmit={props.onSubmit}
      render={(formikProps: FormikProps<Credentials>) => (
        <LoginForm {...formikProps} />
      )}
    />
  );
};
