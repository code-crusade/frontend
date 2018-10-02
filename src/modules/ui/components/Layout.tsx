import * as React from 'react';
import styled from 'styled-components';
import { withLoggedInUser } from '../../../hocs/withLoggedInUser';

const Container = styled.div`
  display: grid;
  padding: 1em;
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
