import { Button, H1, H3, IResizeEntry } from '@blueprintjs/core';
import * as React from 'react';
import MonacoEditor, {
  ChangeHandler,
  EditorDidMount,
} from 'react-monaco-editor';
import styled from 'styled-components';
import { Err404 } from '../../../components/Err404';
import { Loading } from '../../../components/Loading';
import { WithExerciseInjectedProps } from '../hocs/withExercise';

export type EditorProps = {
  editorCode: string;
  editorDidMount: EditorDidMount;
  editorOptions: object;
  editorOnChange: ChangeHandler;
  editorOnResize: (entries: IResizeEntry[]) => void;
  onSubmit: (event: React.MouseEvent<HTMLElement>) => void;
};

const Container = styled.div`
  display: grid;
  grid-row: 2 / end;
  grid-template-columns: 10% 20% auto auto 20% 10%;
  grid-template-rows: 50px 25% 100px auto;
`;

const EditorContainer = styled.div`
  grid-column: 3 / end
  grid-row: 1 / end
`;

const ExerciseContainer = styled.div`
  grid-column: 1 / 3
  grid-row: 1 / end
  padding: 1em
`;

export const ExercisesRead: React.SFC<
  EditorProps & WithExerciseInjectedProps
> = (props) => {
  console.log(props);
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
      <EditorContainer>
        <MonacoEditor
          language="javascript"
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
