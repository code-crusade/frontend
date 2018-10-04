import { IResizeEntry } from '@blueprintjs/core';
import * as monacoEditor from 'monaco-editor';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { SupportedLanguages } from '../../../config/enums';
import IModelContentChangedEvent = monacoEditor.editor.IModelContentChangedEvent;
import IStandaloneCodeEditor = monacoEditor.editor.IStandaloneCodeEditor;
import { RootState } from '../../../store/root-reducer';
import { Omit } from '../../../types/types';
import {
  withLoggedInUser,
  WithLoggedInUserInjectedProps,
} from '../../auth/hocs/withLoggedInUser';
import { exerciseSubmissionsAdd } from '../actions';
import { ExercisesRead } from '../components/ExercisesRead';
import { withExercise, WithExerciseInjectedProps } from '../hocs/withExercise';
import {
  withExerciseSubmissions,
  WithExerciseSubmissionsInjectedProps,
} from '../hocs/withExerciseSubmissions';
import { ExerciseSubmission } from '../models';
import { getMostRecentSubmissionOfUser } from '../selectors';

interface ReadState {
  code: string;
  selectedLanguage: SupportedLanguages;
}

type InjectedProps = WithLoggedInUserInjectedProps &
  WithExerciseInjectedProps &
  WithExerciseSubmissionsInjectedProps;

interface ReadProps extends InjectedProps {
  addSubmission: (values: Omit<ExerciseSubmission, 'id' | 'createdAt'>) => void;
  mostRecentSubmission?: ExerciseSubmission;
}

export class Read extends React.Component<ReadProps, ReadState> {
  editor: IStandaloneCodeEditor | null = null;

  constructor(props: ReadProps) {
    super(props);

    let code = '';
    console.log(props);

    if (props.mostRecentSubmission) {
      code = props.mostRecentSubmission.code;
    } else if (props.exercise) {
      code = props.exercise.templates[SupportedLanguages.Java];
    }

    this.state = {
      code,
      selectedLanguage: SupportedLanguages.Java,
    };
  }

  componentDidUpdate(prevProps: ReadProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.mostRecentSubmission && !prevProps.mostRecentSubmission) {
      this.setState({
        code: this.props.mostRecentSubmission.code,
        selectedLanguage: this.props.mostRecentSubmission.language,
      });
    }
    if (this.props.exercise && !prevProps.exercise) {
      this.setState({
        code: this.props.exercise.templates[SupportedLanguages.Java],
      });
    }
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

  handleLanguageChange = (event: React.FormEvent<HTMLSelectElement>) => {
    this.setState({
      selectedLanguage: event.currentTarget.value as SupportedLanguages,
      code: this.props.exercise.templates[
        event.currentTarget.value as SupportedLanguages
      ],
    });
  };

  handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
    this.props.addSubmission({
      code: this.state.code,
      exerciseId: this.props.exercise.id,
      // userId: this.props.user.id,
      userId: '4bab6e8a-ac2f-4458-ab3e-cb1cd9b08431',
      language: this.state.selectedLanguage,
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
        selectedLanguage={this.state.selectedLanguage}
        onLanguageChange={this.handleLanguageChange}
      />
    );
  }
}

export const ExercisesReadPage = compose(
  withLoggedInUser,
  withExercise,
  withExerciseSubmissions, // This will not scale as we'll have 100s, but it's ok for now
  connect(
    (state: RootState, ownProps: WithExerciseInjectedProps) => {
      if (!ownProps.exercise) {
        return {};
      }
      return {
        mostRecentSubmission: getMostRecentSubmissionOfUser(
          state,
          ownProps.exercise.id,
        ),
      };
    },
    {
      addSubmission: (values: ExerciseSubmission) =>
        exerciseSubmissionsAdd.request(values),
    },
  ),
)(Read);
