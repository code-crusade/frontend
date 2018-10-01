import { NonIdealState } from '@blueprintjs/core';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  grid-column: 3 / 4;
  grid-row: 3 / 4;
  grid-gap: 16px 4px;
  text-align: center;
`;

export const Err404: React.SFC<{}> = () => (
  <Container>
    <NonIdealState
      title="Resource Not Found"
      icon="disable"
      action={<Link to="/">Back to Home</Link>}
      description="This page does not exist"
    />
  </Container>
);
