import { Spinner } from '@blueprintjs/core';
import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  grid-column: 3 / 5;
  grid-row: 3 / 4;
  grid-gap: 16px 4px;
  text-align: center;
`;

export const Loading: React.FunctionComponent<{}> = () => (
  <Container>
    <Spinner />
  </Container>
);
