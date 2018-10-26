import { Formik, FormikProps, FormikValues } from 'formik';
import * as React from 'react';
import { Omit } from 'react-redux';
import { Auth } from '../models';
import { LoginForm } from './LoginForm';

export type OnSubmitLogin = {
  onSubmit: (
    values: Omit<Auth, 'id'>,
    props: FormikProps<Partial<Auth>>,
  ) => void;
};

export type LoginFormikProps = OnSubmitLogin & {
  initialValues: FormikValues;
};

export const LoginFormik: React.SFC<LoginFormikProps> = (props) => {
  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      render={(formikProps: FormikProps<Auth>) => (
        <LoginForm {...formikProps} />
      )}
    />
  );
};
