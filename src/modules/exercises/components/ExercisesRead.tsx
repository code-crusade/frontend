import { Button, H1, H3 } from '@blueprintjs/core';
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
  onSubmit: (event: React.MouseEvent<HTMLElement>) => void;
};

const EditorContainer = styled.div`
  grid-column: 3 / end
  grid-row: 2 / end
`;

const ExerciseContainer = styled.div`
  grid-column: 1 / 3
  grid-row: 2 / end
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
    <React.Fragment>
      <ExerciseContainer>
        <H1>{props.exercise.title.en}</H1>
        <H3>{props.exercise.description.en}</H3>
        <Button onClick={props.onSubmit}>Submit code</Button>
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
    </React.Fragment>
  );
};
