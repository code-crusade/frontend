import * as React from 'react';
import styled from 'styled-components';
import { withLoggedInUser } from '../../../hocs/withLoggedInUser';

const Container = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 50px auto;
  height: 100%;
  justify-items: center;
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
