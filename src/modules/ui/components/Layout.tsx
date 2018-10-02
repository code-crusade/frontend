import * as React from 'react';
import styled from 'styled-components';
import { withLoggedInUser } from '../../../hocs/withLoggedInUser';

const Container = styled.div`
  display: grid;
  padding: 1em;
  grid-template-columns: 10% 20% auto auto 20% 10%;
  grid-template-rows: 50px 25% 100px auto;
  height: 100%;
`;

interface IPropsAppLayout {
  children: React.ReactNode;
  isLoggedIn: boolean;
}

const Layout = (props: IPropsAppLayout) => (
  <Container>
    {React.Children.map(props.children, (child) =>
      React.cloneElement(child as any, { loggedIn: props.isLoggedIn }),
    )}
  </Container>
);

export const AppLayout = withLoggedInUser(Layout);
