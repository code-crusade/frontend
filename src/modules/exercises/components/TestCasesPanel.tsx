import { Button, IPanelProps } from '@blueprintjs/core';
import { FormikProps } from 'formik';
import * as React from 'react';
import styled from 'styled-components';
import { JustifyRightMargin } from '../../../components/styled';
import { Exercise } from '../models';
import { TestCasesField } from './forms/TestCasesField';

type TestCasesPanelProps = FormikProps<Exercise> & IPanelProps;

const Container = styled.div`
  padding: 1em;
`;

export const TestCasesPanel: React.SFC<TestCasesPanelProps> = (
  props: TestCasesPanelProps,
) => {
  const { isSubmitting } = props;

  return (
    <Container>
      <TestCasesField name="sampleTestCases" />
      <JustifyRightMargin>
        <Button intent="primary" disabled={isSubmitting} type="submit">
          Créer
        </Button>
      </JustifyRightMargin>
    </Container>
  );
};
