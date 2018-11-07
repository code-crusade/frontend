/* tslint:disable:no-duplicate-string */

import { Button, H5, IPanelProps, Tab, Tabs } from '@blueprintjs/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import styled from 'styled-components';
import { JustifyRightMargin } from '../../../components/styled/JustifyRightMargin';
import { FunctionReturnTypes } from '../../../config/enums';
import { Exercise } from '../models';
import { EditorTabs } from './EditorTabs';
import { ClassNameField } from './forms/template/ClassNameField';
import { FunctionNameField } from './forms/template/FunctionNameField';
import { FunctionReturnTypeField } from './forms/template/FunctionReturnTypeField';
import { FunctionReturnValueField } from './forms/template/FunctionReturnValueField';
import { ParametersField } from './forms/template/ParametersField';
import { TestCasesPanel } from './TestCasesPanel';

type TemplatePanelProps = FormikProps<Exercise> & IPanelProps;

export const typeOptions = [
  { label: 'boolean', value: FunctionReturnTypes.BOOLEAN },
  { label: 'char', value: FunctionReturnTypes.CHAR },
  { label: 'float', value: FunctionReturnTypes.FLOAT },
  { label: 'int', value: FunctionReturnTypes.INT },
  { label: 'string', value: FunctionReturnTypes.STRING },
  { label: 'boolean[]', value: FunctionReturnTypes['BOOLEAN[]'] },
  { label: 'char[]', value: FunctionReturnTypes['CHAR[]'] },
  { label: 'float[]', value: FunctionReturnTypes['FLOAT[]'] },
  { label: 'int[]', value: FunctionReturnTypes['INT[]'] },
  { label: 'string[]', value: FunctionReturnTypes['STRING[]'] },
];

const Container = styled.div`
  padding: 1em;
`;

export class TemplatePanel extends React.Component<TemplatePanelProps> {
  render() {
    return (
      <Container>
        <FunctionNameField name="template.functionName" />
        <ClassNameField name="template.className" />
        <FunctionReturnTypeField name="template.functionReturnType" />
        <FunctionReturnValueField name="template.functionReturnValue" />
        <ParametersField name="template.params" />
        <H5>Code additionnel</H5>
        <Tabs id={1} renderActiveTabPanelOnly>
          <Tab
            id={'prependedCode'}
            title={"Code avant point d'entrée"}
            panel={
              <EditorTabs
                name="template.prependedCode"
                editorOptions={{ automaticLayout: true }}
              />
            }
          />
          <Tab
            id={'appendedCode'}
            title={"Code après point d'entrée"}
            panel={
              <EditorTabs
                name="template.appendedCode"
                editorOptions={{ automaticLayout: true }}
              />
            }
          />
        </Tabs>
        <JustifyRightMargin>
          <Field
            render={({ form }: FieldProps) => (
              <Button
                disabled={Boolean(!form.dirty || form.errors.template)}
                onClick={this.openTestCasesPanel}
              >
                Suivant
              </Button>
            )}
          />
        </JustifyRightMargin>
      </Container>
    );
  }

  private openTestCasesPanel = () => {
    this.props.openPanel({
      component: TestCasesPanel,
      title: 'Cas de tests',
    });
  };
}
