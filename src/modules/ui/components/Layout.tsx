import * as React from 'react';
import styled from 'styled-components';
import { withLoggedInUser } from '../../../hocs/withLoggedInUser';

const Container = styled.div`
  display: grid;
  grid-template-columns: 10% 20% auto 20% 10%;
  grid-template-rows: 25% 100px auto;
  grid-gap: 16px 16px;
`;

interface IPropsAppLayout {
  children: React.ReactNode;
  isLoggedIn: boolean;
}

const Layout = (props: IPropsAppLayout) => (
  <Container>
    {React.cloneElement(props.children as any, {
      loggedIn: props.isLoggedIn,
    })}
  </Container>
);

export const AppLayout = withLoggedInUser(Layout);
