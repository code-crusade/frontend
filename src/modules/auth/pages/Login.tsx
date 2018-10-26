import { FormikProps } from 'formik';
import * as React from 'react';
import { connect } from 'react-redux';
import { authLogIn } from '../actions';
import { Login as LoginComponent } from '../components/Login';
import { Credentials } from '../models';

interface LoginProps {
  login(credentials: Credentials): void;
}

export class Login extends React.Component<LoginProps> {
  handleSubmit(
    credentials: Credentials,
    props: FormikProps<Partial<Credentials>>,
  ) {
    this.props.login(credentials);
  }

  render() {
    return (
      <React.Fragment>
        <LoginComponent onSubmit={this.handleSubmit} />
      </React.Fragment>
    );
  }
}

function mapDispatchToProps() {
  return {
    login: (credentials: Credentials) => authLogIn.request,
  };
}

export const LoginPage = connect(
  null,
  mapDispatchToProps,
)(Login);
