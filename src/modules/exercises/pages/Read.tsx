import * as monacoEditor from 'monaco-editor';
import IModelContentChangedEvent = monacoEditor.editor.IModelContentChangedEvent;
import IStandaloneCodeEditor = monacoEditor.editor.IStandaloneCodeEditor;
import * as React from 'react';
import { ExercisesRead } from '../components/ExercisesRead';
import { InjectedProps, withExercise } from '../hocs/withExercise';

interface ReadState {
  code: string;
}

export class Read extends React.Component<InjectedProps, ReadState> {
  static editorDidMount(
    codeEditor: IStandaloneCodeEditor,
    monaco: typeof monacoEditor,
  ) {
    console.log('editorDidMount', codeEditor);
    codeEditor.focus();
  }
  state = {
    code: '// type your code...',
  };

  onChange = (newValue: string, e: IModelContentChangedEvent) => {
    console.log('onChange', newValue, e);
    this.setState({ code: newValue });
  };

  render() {
    return (
      <ExercisesRead
        exercises={this.props.exercises}
        loading={this.props.loading}
        error={this.props.error}
        editorCode={this.state.code}
        editorOptions={{
          selectOnLineNumbers: true,
        }}
        editorDidMount={Read.editorDidMount}
        editorOnChange={this.onChange}
      />
    );
  }
}

export const ExercisesReadPage = withExercise(Read);
