import IModelContentChangedEvent = monacoEditor.editor.IModelContentChangedEvent;
import { push } from 'connected-react-router';
import { FormikProps } from 'formik';
import * as monacoEditor from 'monaco-editor';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Exercise, SupportedLanguages } from '../../../__generated__/api';
import { history } from '../../../services';
import { Omit } from '../../../types/types';
import {
  withLoggedInUser,
  WithLoggedInUserInjectedProps,
} from '../../auth/hocs/withLoggedInUser';
import { exercisesEdit } from '../actions';
import { ExercisesAdd } from '../components/ExercisesAdd';
import { withExercise, WithExerciseInjectedProps } from '../hocs/withExercise';

interface EditState {
  code: string;
  selectedLanguage: SupportedLanguages;
}

type InjectedProps = WithLoggedInUserInjectedProps & WithExerciseInjectedProps;

interface EditProps extends InjectedProps {
  editExercise: (values: Omit<Exercise, 'id' | 'fixtures'>) => void;
  history: typeof push;
}

export class Edit extends React.Component<EditProps, EditState> {
  handleChange = (newValue: string, e: IModelContentChangedEvent) => {
    this.setState({ code: newValue });
  };

  handleSubmit = (
    values: Omit<Exercise, 'id' | 'fixtures'>,
    props: FormikProps<Partial<Exercise>>,
  ) => {
    this.props.editExercise({ ...values });

    history.push('/exercises');
  };

  render() {
    return (
      <ExercisesAdd
        loading={this.props.loading}
        error={this.props.error}
        onSubmit={this.handleSubmit}
        exercise={this.props.exercise}
      />
    );
  }
}

const mapDispatchToProps = {
  editExercise: (values: Exercise) => exercisesEdit.request(values),
  push,
};

export const ExercisesEditPage = compose(
  withLoggedInUser,
  withExercise,
  connect(
    null,
    mapDispatchToProps,
  ),
)(Edit);
