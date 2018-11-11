import * as monacoEditor from 'monaco-editor';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  ExerciseSubmission,
  SupportedLanguages,
} from '../../../__generated__/api';
import { generateCodeFromTemplate } from '../../../helpers';
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

    if (props.mostRecentSubmission) {
      code = props.mostRecentSubmission.code;
    } else if (props.exercise) {
      code = generateCodeFromTemplate(
        props.exercise.template,
        SupportedLanguages.Javascript,
      );
    }

    this.state = {
      code,
      selectedLanguage: SupportedLanguages.Javascript,
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
        code: generateCodeFromTemplate(
          this.props.exercise.template,
          SupportedLanguages.Javascript,
        ),
      });
    }
  }

  editorDidMount = (
    editor: IStandaloneCodeEditor,
    monaco: typeof monacoEditor,
  ) => {
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
      code: generateCodeFromTemplate(this.props.exercise.template, event
        .currentTarget.value as SupportedLanguages),
    });
  };

  handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
    this.props.addSubmission({
      code: this.state.code,
      exerciseId: this.props.exercise.id,
      // userId: this.props.user.id,
      userId: 1,
      language: this.state.selectedLanguage,
    });
  };

  handleResize = () => {
    setInterval(() => {
      if (this.editor) {
        this.editor.layout();
      }
    }, 100);
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
          automaticLayout: false,
        }}
        editorDidMount={this.editorDidMount}
        editorOnChange={this.handleChange}
        onSubmit={this.handleSubmit}
        selectedLanguage={this.state.selectedLanguage}
        onLanguageChange={this.handleLanguageChange}
      />
    );
  }
}

const mapStateToProps = (
  state: RootState,
  ownProps: WithExerciseInjectedProps,
) => {
  if (!ownProps.exercise) {
    return {};
  }
  return {
    mostRecentSubmission: getMostRecentSubmissionOfUser(
      state,
      ownProps.exercise.id,
    ),
  };
};

const mapDispatchToProps = {
  addSubmission: (values: ExerciseSubmission) =>
    exerciseSubmissionsAdd.request(values),
};

export const ExercisesReadPage = compose(
  withLoggedInUser,
  withExercise,
  withExerciseSubmissions,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Read);
