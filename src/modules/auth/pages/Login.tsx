import { FormikProps } from 'formik';
import * as React from 'react';
import { Omit } from 'src/types/types';
import { Login } from '../components/Login';
import { Auth } from '../models';

export class LoginPage extends React.Component {
  handleSubmit(values: Omit<Auth, 'id'>, props: FormikProps<Partial<Auth>>) {
    console.log('Login sent!');
  }

  render() {
    return (
      <div>
        <Login onSubmit={this.handleSubmit} />
      </div>
    );
  }
}
