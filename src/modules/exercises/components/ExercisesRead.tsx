import * as React from 'react';
import MonacoEditor, {
  ChangeHandler,
  EditorDidMount,
} from 'react-monaco-editor';
import { InjectedProps } from '../hocs/withExercises';

export type EditorProps = {
  editorCode: string;
  editorDidMount: EditorDidMount;
  editorOptions: object;
  editorOnChange: ChangeHandler;
};

export const ExercisesRead: React.SFC<EditorProps & InjectedProps> = (
  props,
) => (
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
);
