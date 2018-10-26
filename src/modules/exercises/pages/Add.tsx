import IModelContentChangedEvent = monacoEditor.editor.IModelContentChangedEvent;
import { push } from 'connected-react-router';
import { FormikProps } from 'formik';
import * as monacoEditor from 'monaco-editor';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { SupportedLanguages } from '../../../config/enums';
import { history } from '../../../services';
import { RootState } from '../../../store/root-reducer';
import { Omit } from '../../../types/types';
import {
  withLoggedInUser,
  WithLoggedInUserInjectedProps,
} from '../../auth/hocs/withLoggedInUser';
import { exercisesAdd } from '../actions';
import { ExercisesAdd } from '../components/ExercisesAdd';
import { WithExerciseInjectedProps } from '../hocs/withExercise';
import { WithExerciseSubmissionsInjectedProps } from '../hocs/withExerciseSubmissions';
import { Exercise, ExerciseSubmission } from '../models';
import { getMostRecentSubmissionOfUser } from '../selectors';

interface AddState {
  code: string;
  selectedLanguage: SupportedLanguages;
}

type InjectedProps = WithLoggedInUserInjectedProps &
  WithExerciseInjectedProps &
  WithExerciseSubmissionsInjectedProps;

interface AddProps extends InjectedProps {
  addExercise: (values: Omit<Exercise, 'id'>) => void;
  mostRecentSubmission?: ExerciseSubmission;
  history: typeof push;
}

export class Add extends React.Component<AddProps, AddState> {
  handleChange = (newValue: string, e: IModelContentChangedEvent) => {
    this.setState({ code: newValue });
  };

  handleSubmit = (
    values: Omit<Exercise, 'id'>,
    props: FormikProps<Partial<Exercise>>,
  ) => {
    this.props.addExercise({ ...values });

    history.push('/exercises');
  };

  render() {
    return (
      <ExercisesAdd
        loading={this.props.loading}
        error={this.props.error}
        onSubmit={this.handleSubmit}
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
  addExercise: (values: Exercise) => exercisesAdd.request(values),
  push,
};

export const ExercisesAddPage = compose(
  withLoggedInUser,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Add);
