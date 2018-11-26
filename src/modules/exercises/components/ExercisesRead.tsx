import { Button, H1, H3, HTMLSelect, Tab, Tabs } from '@blueprintjs/core';
import * as React from 'react';
import MonacoEditor, {
  ChangeHandler,
  EditorDidMount,
} from 'react-monaco-editor';
import styled from 'styled-components';
import { RunnerState } from '..';
import { SupportedLanguages } from '../../../__generated__/api';
import { Err404 } from '../../../components/Err404';
import { Loading } from '../../../components/Loading';
import { WithExerciseInjectedProps } from '../hocs/withExercise';
import { InstructionsPanel } from './InstructionsPanel';
import { OutputPanel } from './OutputPanel';

export type EditorProps = {
  editorCode: string;
  editorDidMount: EditorDidMount;
  editorOptions: object;
  editorOnChange: ChangeHandler;
  onSubmit: (event: React.MouseEvent<HTMLElement>) => void;
  onValidateClick: (event: React.MouseEvent<HTMLElement>) => void;
  selectedLanguage: SupportedLanguages;
  onLanguageChange: React.ChangeEventHandler<HTMLSelectElement>;
  runner: RunnerState;
  sampleTestsCode: string;
};

const Container = styled.div`
  display: grid;
  grid-row: 2 / end;
  grid-template-columns: 50% 50%;
  grid-template-rows: 1fr 1fr;
  width: 99%;
`;

const EditorContainer = styled.div`
  grid-column: 2 / end;
  grid-row: 1 / 2;
  max-width: 99%;
`;

const SampleTestsContainer = styled.div`
  grid-column: 2 / end;
  grid-row: 2 / 3;
  max-width: 99%;
`;

const ExerciseContainer = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / end;
  padding: 1em;
`;

const languagesOptions = [
  { label: 'C++', value: SupportedLanguages.Cpp },
  { label: 'Java', value: SupportedLanguages.Java },
  { label: 'Javascript', value: SupportedLanguages.Javascript },
  { label: 'Python', value: SupportedLanguages.Python },
];

export const ExercisesRead: React.SFC<
  EditorProps & WithExerciseInjectedProps
> = (props) => {
  if (props.loading) {
    return <Loading />;
  }
  if (props.error || !props.exercise) {
    return <Err404 />;
  }
  return (
    <Container>
      <ExerciseContainer>
        <H1>{props.exercise.title.fr}</H1>
        <Tabs id="ExerciseTab">
          <Tab
            id="Instructions"
            title="Instructions"
            panel={<InstructionsPanel exercise={props.exercise} />}
          />
          <Tab
            id="Output"
            title="Sortie"
            panel={<OutputPanel runner={props.runner} />}
          />
        </Tabs>
        <Button onClick={props.onSubmit}>Soumettre</Button>
        <Button onClick={props.onValidateClick}>Valider tests</Button>
      </ExerciseContainer>
      <EditorContainer>
        <HTMLSelect
          large
          options={languagesOptions}
          value={props.selectedLanguage}
          onChange={props.onLanguageChange}
        />
        <H3>Solution</H3>
        <MonacoEditor
          language={props.selectedLanguage}
          theme="vs-dark"
          value={props.editorCode}
          options={props.editorOptions}
          onChange={props.editorOnChange}
          editorDidMount={props.editorDidMount}
        />
      </EditorContainer>
      <SampleTestsContainer>
        <H3>Cas de tests d'example</H3>
        <MonacoEditor
          height="300"
          language={props.selectedLanguage}
          theme="vs-dark"
          options={{ ...props.editorOptions, readOnly: true }}
          value={props.sampleTestsCode}
        />
      </SampleTestsContainer>
    </Container>
  );
};
