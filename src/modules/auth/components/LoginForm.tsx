import { Button, FormGroup, InputGroup, Intent } from '@blueprintjs/core';
import { Form, FormikProps } from 'formik';
import * as React from 'react';
import { Auth } from '../models';

export type LoginFormProps = FormikProps<Auth>;

export class LoginForm extends React.Component<LoginFormProps> {
  render() {
    return (
      <Form>
        <FormGroup label="Email" intent="danger">
          <InputGroup name="email" placeholder="Email" leftIcon="envelope" />
        </FormGroup>
        <FormGroup label="Mot de passe" intent={Intent.DANGER}>
          <InputGroup
            name="password"
            placeholder="Mot de passe"
            leftIcon="lock"
          />
        </FormGroup>
        <Button
          type="submit"
          disabled={this.props.isSubmitting}
          intent="primary"
        >
          Connexion
        </Button>
      </Form>
    );
  }
}
