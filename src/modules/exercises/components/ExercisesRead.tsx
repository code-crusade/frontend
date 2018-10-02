import { H1, H3 } from '@blueprintjs/core';
import * as React from 'react';
import MonacoEditor, {
  ChangeHandler,
  EditorDidMount,
} from 'react-monaco-editor';
import { Err404 } from '../../../components/Err404';
import { Loading } from '../../../components/Loading';
import { InjectedProps } from '../hocs/withExercise';

export type EditorProps = {
  editorCode: string;
  editorDidMount: EditorDidMount;
  editorOptions: object;
  editorOnChange: ChangeHandler;
};

export const ExercisesRead: React.SFC<EditorProps & InjectedProps> = (
  props,
) => {
  if (props.loading) {
    return <Loading />;
  }
  if (props.error || !props.exercise) {
    return <Err404 />;
  }
  return (
    <React.Fragment>
      <H1>{props.exercise.title.en}</H1>
      <H3>{props.exercise.description.en}</H3>
      <MonacoEditor
        width="800"
        height="600"
        language="javascript"
        theme="vs-dark"
        value={props.editorCode}
        options={props.editorOptions}
        onChange={props.editorOnChange}
        editorDidMount={props.editorDidMount}
      />
    </React.Fragment>
  );
};
