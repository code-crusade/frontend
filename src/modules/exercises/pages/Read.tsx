import * as monacoEditor from 'monaco-editor';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { RunnerState } from '..';
import {
  ExerciseSubmission,
  RunnerArguments,
  SupportedLanguages,
} from '../../../__generated__/api';
import { generateInitialCode, generateTests } from '../../../helpers';
import IModelContentChangedEvent = monacoEditor.editor.IModelContentChangedEvent;
import IStandaloneCodeEditor = monacoEditor.editor.IStandaloneCodeEditor;
import { RootState } from '../../../store/root-reducer';
import { Omit } from '../../../types/types';
import {
  withLoggedInUser,
  WithLoggedInUserInjectedProps,
} from '../../auth/hocs/withLoggedInUser';
import { exercisesTestCode, exerciseSubmissionsAdd } from '../actions';
import { ExercisesRead } from '../components/ExercisesRead';
import { withExercise, WithExerciseInjectedProps } from '../hocs/withExercise';
import {
  withExerciseSubmissions,
  WithExerciseSubmissionsInjectedProps,
} from '../hocs/withExerciseSubmissions';
import { getMostRecentSubmissionOfUser, getRunner } from '../selectors';

interface ReadState {
  code: string;
  selectedLanguage: SupportedLanguages;
  sampleTestsCode: string;
}

type InjectedProps = WithLoggedInUserInjectedProps &
  WithExerciseInjectedProps &
  WithExerciseSubmissionsInjectedProps;

interface ReadProps extends InjectedProps {
  addSubmission: (
    values: Omit<ExerciseSubmission, 'id' | 'createdAt' | 'userId'>,
  ) => void;
  testCode: (values: RunnerArguments) => void;
  mostRecentSubmission?: ExerciseSubmission;
  runner: RunnerState;
}

export class Read extends React.Component<ReadProps, ReadState> {
  editor: IStandaloneCodeEditor | null = null;

  constructor(props: ReadProps) {
    super(props);

    let code = '';
    let sampleTestsCode = '';
    let selectedLanguage = SupportedLanguages.Javascript;
    if (props.mostRecentSubmission) {
      code = props.mostRecentSubmission.code;
      selectedLanguage = props.mostRecentSubmission
        .language as SupportedLanguages;
    } else if (props.exercise) {
      code = generateInitialCode(
        props.exercise.template,
        SupportedLanguages.Javascript,
      );
      sampleTestsCode = generateTests(this.props.exercise, selectedLanguage);
    }

    this.state = { code, selectedLanguage, sampleTestsCode };
  }

  componentDidUpdate(prevProps: ReadProps, prevState: ReadState) {
    // Typical usage (don't forget to compare props):
    if (this.props.mostRecentSubmission && !prevProps.mostRecentSubmission) {
      this.setState({
        code: this.props.mostRecentSubmission.code,
        selectedLanguage: this.props.mostRecentSubmission
          .language as SupportedLanguages,
      });
    }
    if (
      (this.props.exercise && !prevProps.exercise) ||
      this.state.selectedLanguage !== prevState.selectedLanguage
    ) {
      this.setState({
        code: generateInitialCode(
          this.props.exercise.template,
          this.state.selectedLanguage || SupportedLanguages.Javascript,
        ),
        sampleTestsCode: generateTests(
          this.props.exercise,
          this.state.selectedLanguage || SupportedLanguages.Javascript,
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
    this.setState({ code: newValue });
  };

  handleLanguageChange = (event: React.FormEvent<HTMLSelectElement>) => {
    this.setState({
      selectedLanguage: event.currentTarget.value as SupportedLanguages,
      code: generateInitialCode(this.props.exercise.template, event
        .currentTarget.value as SupportedLanguages),
      sampleTestsCode: generateTests(this.props.exercise, event.currentTarget
        .value as SupportedLanguages),
    });
  };

  handleSubmit = () => {
    this.props.addSubmission({
      exerciseId: this.props.exercise.id,
      code: this.state.code,
      language: this.state.selectedLanguage,
    });
  };

  handleValidateClick = () => {
    this.props.testCode({
      code: this.state.code,
      language: this.state.selectedLanguage,
      fixture: 'test fixture',
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
        onSubmit={this.handleValidateClick}
        onValidateClick={this.handleValidateClick}
        selectedLanguage={this.state.selectedLanguage}
        onLanguageChange={this.handleLanguageChange}
        runner={this.props.runner}
        sampleTestsCode={this.state.sampleTestsCode}
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
    runner: getRunner(state),
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: WithExerciseInjectedProps,
) => ({
  addSubmission: (values: ExerciseSubmission) =>
    dispatch(exerciseSubmissionsAdd.request(values)),
  testCode: (values: RunnerArguments) =>
    dispatch(
      exercisesTestCode.request({
        exerciseId: ownProps.exercise.id,
        ...values,
      }),
    ),
});

export const ExercisesReadPage = compose(
  withLoggedInUser,
  withExercise,
  withExerciseSubmissions,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Read);
