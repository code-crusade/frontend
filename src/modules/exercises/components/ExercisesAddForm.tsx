/* tslint:disable:no-duplicate-string */

import { H4, PanelStack } from '@blueprintjs/core';
import { Form, FormikProps } from 'formik';
import * as React from 'react';
import styled from 'styled-components';
import { SupportedLanguages } from '../../../__generated__/api';
import { generateInitialCode, generateTests } from '../../../helpers';
import { DescriptionPanel } from './DescriptionPanel';
import { EditorTabs } from './EditorTabs';
import { FormValues } from './ExercisesAddFormik';

export type ExercisesAddFormProps = FormikProps<FormValues>;

const readOnlyEditorOptions = {
  contextmenu: false,
  readOnly: true,
  automaticLayout: true,
};

const Container = styled.div`
  width: 100%
  max-width: 1920px;
  display: grid;
  grid-row: 2 / end;
  grid-template-columns: 50% 50%;
  grid-template-rows: 100%;
`;

// max-width at 100% prevents the editor from resizing correctly
const PreviewContainer = styled.div`
  grid-column: 2 / end;
  grid-row: 1 / end;
  padding: 1em;
  max-width: 99%;
`;

const FormContainer = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / end;
  padding: 1em;
  max-width: 99%;

  .bp3-panel-stack-view {
    position: unset;
  }
`;

export class ExercisesAddForm extends React.Component<ExercisesAddFormProps> {
  render() {
    const { values, validateField, validateForm } = this.props;
    const generatedCode = {
      ...Object.values(SupportedLanguages).reduce(
        (carry, lang) => generateInitialCode(values.template, lang),
        {},
      ),
    };

    const generatedTests = {
      ...Object.values(SupportedLanguages).reduce(
        (carry, lang) => generateTests(values, lang),
        {},
      ),
    };

    return (
      <Container>
        <FormContainer>
          <h1>Nouvel exercice</h1>
          <Form>
            {/* TODO: Find a better solution than PanelStack. It doesn't update when the props change (?!?!!??)*/}
            <PanelStack
              initialPanel={{
                component: DescriptionPanel,
                props: { validateForm, validateField },
                title: 'Description',
              }}
            />
          </Form>
        </FormContainer>
        <PreviewContainer>
          <H4>Preview du code</H4>
          <EditorTabs
            languageMap={generatedCode}
            editorOptions={readOnlyEditorOptions}
          />
          <H4>Preview des cas de tests</H4>
          <EditorTabs
            languageMap={generatedTests}
            editorOptions={readOnlyEditorOptions}
          />
        </PreviewContainer>
      </Container>
    );
  }
}
