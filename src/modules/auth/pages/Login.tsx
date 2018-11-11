import { push } from 'connected-react-router';
import { FormikProps } from 'formik';
import * as React from 'react';
import { connect } from 'react-redux';
import { history } from 'src/services';
import { WithHistory } from 'src/types/types';
import { Credentials } from '../../../__generated__/api';
import { authLogIn } from '../actions';
import { Login as LoginComponent } from '../components/Login';

interface LoginProps extends WithHistory {
  login(credentials: Credentials): void;
}

export class Login extends React.PureComponent<LoginProps> {
  readonly handleSubmit = (
    credentials: Credentials,
    props: FormikProps<Credentials>,
  ) => {
    this.props.login(credentials);
    // Redirect
    history.push('/');
  };

  render() {
    return (
      <React.Fragment>
        <LoginComponent onSubmit={this.handleSubmit} />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  login: (credentials: Credentials) => authLogIn.request(credentials),
  push,
};

export const LoginPage = connect(
  null,
  mapDispatchToProps,
)(Login);
