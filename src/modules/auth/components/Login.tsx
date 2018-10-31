import { Card, H4 } from '@blueprintjs/core';
import * as React from 'react';
import styled from 'styled-components';
import { LoginForm, OnSubmitLogin } from './LoginForm';

export type LoginProps = OnSubmitLogin;

const Container = styled.div`
  display: grid;
  align-self: center;
  min-width: 25%;
`;

export const Login: React.SFC<LoginProps> = (props) => {
  return (
    <Container>
      <H4>Se connecter</H4>
      <Card elevation={1}>
        <LoginForm initialValues={{}} onSubmit={props.onSubmit} />
      </Card>
    </Container>
  );
};
