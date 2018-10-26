import {
  Button,
  Classes,
  FormGroup,
  InputGroup,
  Intent,
} from '@blueprintjs/core';
import * as classNames from 'classnames';
import { Form, FormikProps } from 'formik';
import { get } from 'lodash';
import * as React from 'react';
import { Credentials } from '../models';

export type LoginFormProps = FormikProps<Credentials>;

export class LoginForm extends React.Component<LoginFormProps> {
  render() {
    const { touched, errors } = this.props;

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
