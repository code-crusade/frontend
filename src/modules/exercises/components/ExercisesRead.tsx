import * as React from 'react';
import MonacoEditor, { ChangeHandler } from 'react-monaco-editor';

export type EditorProps = {
  code: string;
  options: object;
  onChange: ChangeHandler;
};

export const ExercisesRead: React.SFC<EditorProps> = (props) => (
  <MonacoEditor
    width="800"
    height="600"
    language="javascript"
    theme="vs-dark"
    value={props.code}
    options={props.options}
    onChange={props.onChange}
  />
);
