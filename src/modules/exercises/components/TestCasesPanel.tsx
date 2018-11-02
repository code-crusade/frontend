/* tslint:disable:no-duplicate-string */

import { Button, IPanelProps } from '@blueprintjs/core';
import { FormikProps } from 'formik';
import * as React from 'react';
import styled from 'styled-components';
import { JustifyRight } from '../../../components/styled/JustifyRight';
import { Exercise } from '../models';

type TestCasesPanelProps = FormikProps<Exercise> & IPanelProps;

const Container = styled.div`
  padding: 1em;
`;
export class TestCasesPanel extends React.Component<TestCasesPanelProps> {
  render() {
    const { isSubmitting } = this.props;

    return (
      <Container>
        <JustifyRight>
          <Button disabled={isSubmitting} type="submit">
            Ajouter
          </Button>
        </JustifyRight>
      </Container>
    );
  }
}
