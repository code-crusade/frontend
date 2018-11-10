import * as React from 'react';
import styled from 'styled-components';

interface Props {
  leftPanel: React.ReactNode;
  leftHeader?: string | React.ReactNode;
  rightPanel: React.ReactNode;
  rightHeader?: string | React.ReactNode;
}

const Container = styled.div`
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  grid-template-rows: 1fr;
`;

const Left = styled.div`
  padding: 10px;
  padding-right: 20px;
  border-right: 3px dashed #3c4c5940;
`;

const Right = styled.div`
  padding: 10px;
  padding-left: 20px;
`;

export const TwoColumnsLayout: React.SFC<Props> = (props) => {
  const { leftPanel, rightPanel, leftHeader, rightHeader } = props;
  return (
    <Container>
      <Left>
        {leftHeader && <h1>{leftHeader}</h1>}
        {leftPanel}
      </Left>
      <Right>
        {rightHeader && <h1>{rightHeader}</h1>}
        {rightPanel}
      </Right>
    </Container>
  );
};
