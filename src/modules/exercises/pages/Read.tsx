import { IResizeEntry } from '@blueprintjs/core';
import { get } from 'lodash';
import * as monacoEditor from 'monaco-editor';
import IModelContentChangedEvent = monacoEditor.editor.IModelContentChangedEvent;
import IStandaloneCodeEditor = monacoEditor.editor.IStandaloneCodeEditor;
import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  withLoggedInUser,
  WithLoggedInUserInjectedProps,
} from '../../../hocs/withLoggedInUser';
import { Omit } from '../../../types/types';
import { exerciseSubmissionsAdd } from '../actions';
import { ExercisesRead } from '../components/ExercisesRead';
import { withExercise, WithExerciseInjectedProps } from '../hocs/withExercise';
import {
  withExerciseSubmissions,
  WithExerciseSubmissionsInjectedProps,
} from '../hocs/withExerciseSubmissions';
import { ExerciseSubmission } from '../models';

interface ReadState {
  code: string;
}

type InjectedProps = WithLoggedInUserInjectedProps &
  WithExerciseInjectedProps &
  WithExerciseSubmissionsInjectedProps;

interface ReadProps extends InjectedProps {
  addSubmission: (values: Omit<ExerciseSubmission, 'id'>) => void;
}

export class Read extends React.Component<ReadProps, ReadState> {
  editor: IStandaloneCodeEditor | null = null;

  constructor(props: ReadProps) {
    super(props);

    this.state = {
      code: get(props, 'exerciseSubmission.code', '// type your code here'),
    };
  }

  editorDidMount = (
    editor: IStandaloneCodeEditor,
    monaco: typeof monacoEditor,
  ) => {
    console.log('editorDidMount', editor);
    this.editor = editor;
    editor.focus();
  };

  handleChange = (newValue: string, e: IModelContentChangedEvent) => {
    console.log('handleChange', newValue, e);
    this.setState({ code: newValue });
  };

  handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
    this.props.addSubmission({
      code: this.state.code,
      exerciseId: this.props.exercise.id,
      // userId: this.props.user.id,
      userId: '4bab6e8a-ac2f-4458-ab3e-cb1cd9b08431',
    });
  };

  handleEditorResize = (entries: IResizeEntry[]) => {
    console.log(
      entries.map((e) => `${e.contentRect.width} x ${e.contentRect.height}`),
    );
    if (this.editor) {
      this.editor.layout();
    }
  };

  handleResize = () => {
    return (this.editor as any).layout();
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    return (
      <ExercisesRead
        exercise={this.props.exercise}
        loading={this.props.loading}
        error={this.props.error}
        editorCode={this.state.code}
        editorOptions={{
          selectOnLineNumbers: true,
        }}
        editorDidMount={this.editorDidMount}
        editorOnChange={this.handleChange}
        onSubmit={this.handleSubmit}
        editorOnResize={this.handleEditorResize}
      />
    );
  }
}

export const ExercisesReadPage = compose(
  withLoggedInUser,
  withExercise,
  withExerciseSubmissions, // This will not scale as we'll have 100s, but it's ok for now
  connect(
    null,
    {
      addSubmission: (values: ExerciseSubmission) =>
        exerciseSubmissionsAdd.request(values),
    },
  ),
)(Read);
