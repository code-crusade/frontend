import styled from 'styled-components';

export const JustifyRight = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
`;

export const JustifyRightMargin = styled(JustifyRight)`
  margin-bottom: 2em;
`;

export const Centered = styled.div`
  display: flex;
  justify-content: center;
`;

export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;
