import {
  Button,
  Classes,
  FormGroup,
  InputGroup,
  Intent,
} from '@blueprintjs/core';
import * as classNames from 'classnames';
import { Form, Formik, FormikProps, FormikValues } from 'formik';
import { get } from 'lodash';
import * as React from 'react';
import * as Yup from 'yup';
import { Credentials } from '../../../__generated__/api';

class LoginForm extends React.Component<FormikProps<Credentials>> {
  render() {
    const { touched, errors, isSubmitting, handleChange } = this.props;

    return (
      <Form>
        <FormGroup
          label="Email"
          intent="danger"
          helperText={get(touched, 'email') && get(errors, 'email')}
        >
          <InputGroup
            type="email"
            name="email"
            placeholder="Email"
            leftIcon="envelope"
            onChange={handleChange}
            className={classNames({
              [Classes.INTENT_DANGER]:
                get(touched, 'email') && get(errors, 'email'),
            })}
          />
        </FormGroup>
        <FormGroup label="Mot de passe" intent={Intent.DANGER}>
          <InputGroup
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Mot de passe"
            leftIcon="lock"
          />
        </FormGroup>
        <Button type="submit" disabled={isSubmitting} intent="primary">
          Connexion
        </Button>
      </Form>
    );
  }
}

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
    .required('Email requis'),
  password: Yup.string().required('Mot de passe requis'),
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
