import * as React from 'react';
import styled from 'styled-components';
import { LoginFormik, OnSubmitLogin } from './LoginFormik';

export type LoginProps = OnSubmitLogin;

const Container = styled.div`
  display: grid;
`;

export const Login: React.SFC<LoginProps> = (props) => {
  return (
    <Container>
      <h1>Se connecter</h1>
      <LoginFormik initialValues={{}} onSubmit={props.onSubmit} />
    </Container>
  );
};
