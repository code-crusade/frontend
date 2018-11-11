import { Button, H1, H3, HTMLSelect } from '@blueprintjs/core';
import * as React from 'react';
import MonacoEditor, {
  ChangeHandler,
  EditorDidMount,
} from 'react-monaco-editor';
import styled from 'styled-components';
import { SupportedLanguages } from '../../../__generated__/api';
import { Err404 } from '../../../components/Err404';
import { Loading } from '../../../components/Loading';
import { WithExerciseInjectedProps } from '../hocs/withExercise';

export type EditorProps = {
  editorCode: string;
  editorDidMount: EditorDidMount;
  editorOptions: object;
  editorOnChange: ChangeHandler;
  onSubmit: (event: React.MouseEvent<HTMLElement>) => void;
  selectedLanguage: SupportedLanguages;
  onLanguageChange: React.ChangeEventHandler<HTMLSelectElement>;
};

const Container = styled.div`
  display: grid;
  grid-row: 2 / end;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50px 25% 100px auto;
`;

const EditorContainer = styled.div`
  grid-column: 2 / end
  grid-row: 2 / end
  padding: 1em;
  max-width: 99%;
  max-height: 99%
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
        <H3>{props.exercise.description.fr}</H3>
        <Button onClick={props.onSubmit}>Soumettre</Button>
      </ExerciseContainer>
      <HTMLSelect
        large
        options={languagesOptions}
        value={props.selectedLanguage}
        onChange={props.onLanguageChange}
      />
      <EditorContainer>
        <MonacoEditor
          language={props.selectedLanguage}
          theme="vs-dark"
          value={props.editorCode}
          options={props.editorOptions}
          onChange={props.editorOnChange}
          editorDidMount={props.editorDidMount}
        />
      </EditorContainer>
    </Container>
  );
};
