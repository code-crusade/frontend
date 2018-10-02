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

  constructor(props: ReadProps) {
    super(props);

    this.state = {
      code: get(props, 'exerciseSubmission.code', '// type your code here'),
    };
  }

  onChange = (newValue: string, e: IModelContentChangedEvent) => {
    console.log('onChange', newValue, e);
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
        editorDidMount={Read.editorDidMount}
        editorOnChange={this.onChange}
        onSubmit={this.handleSubmit}
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
