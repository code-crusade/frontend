import { Button, H5, IPanelProps, Tab, Tabs } from '@blueprintjs/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import styled from 'styled-components';
import { Exercise, SupportedType } from '../../../__generated__/api';
import { JustifyRightMargin } from '../../../components/styled';
import { EditorTabs } from './EditorTabs';
import { FunctionNameField } from './forms/template/FunctionNameField';
import { FunctionReturnTypeField } from './forms/template/FunctionReturnTypeField';
import { ParametersField } from './forms/template/ParametersField';
import { TestCasesPanel } from './TestCasesPanel';

type TemplatePanelProps = FormikProps<Exercise> & IPanelProps;

export const typeOptions = [
  { label: 'boolean', value: SupportedType.BOOLEAN },
  { label: 'char', value: SupportedType.CHAR },
  { label: 'float', value: SupportedType.FLOAT },
  { label: 'int', value: SupportedType.INT },
  { label: 'string', value: SupportedType.STRING },
  { label: 'boolean[]', value: SupportedType.BOOLEANARRAY },
  { label: 'char[]', value: SupportedType.CHARARRAY },
  { label: 'float[]', value: SupportedType.FLOATARRAY },
  { label: 'int[]', value: SupportedType.INTARRAY },
  { label: 'string[]', value: SupportedType.STRINGARRAY },
];

const Container = styled.div`
  padding: 1em;
`;

export class TemplatePanel extends React.Component<TemplatePanelProps> {
  render() {
    return (
      <Container>
        <FunctionNameField name="template.functionName" />
        <FunctionReturnTypeField name="template.functionReturnType" />
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
                disabled={Boolean(
                  (!form.dirty && !form.values.id) || form.errors.template,
                )}
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
