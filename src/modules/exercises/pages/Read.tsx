import * as monacoEditor from 'monaco-editor';
import IModelContentChangedEvent = monacoEditor.editor.IModelContentChangedEvent;
import IStandaloneCodeEditor = monacoEditor.editor.IStandaloneCodeEditor;
import * as React from 'react';
import { ExercisesRead } from '../components/ExercisesRead';

export class ExercisesReadPage extends React.Component {
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
        code={this.state.code}
        options={{
          selectOnLineNumbers: true,
        }}
        onChange={this.onChange}
      />
    );
  }
}
