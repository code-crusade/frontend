import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../../store/root-reducer';
import { exercisesRead } from '../actions';
import { Exercise } from '../models';
import {
  getExerciseById,
  getExercisesError,
  getExercisesLoading,
} from '../selectors';

// These props will be subtracted from original component type
export interface InjectedProps {
  loading: boolean;
  error: Error;
  exercise: Exercise;
}

interface SubstractedProps extends RouteComponentProps<{ id: string }> {
  readExercise: (id: string) => void;
}

export const withExercise = <WrappedProps extends InjectedProps>(
  WrappedComponent: React.ComponentType<WrappedProps>,
) => {
  class WithExercise extends React.Component<SubstractedProps & InjectedProps> {
    // Enhance component name for debugging and ReactDevTools
    public static displayName = `withExercise(${WrappedComponent.name})`;
    // reference to original wrapped component
    public static readonly WrappedComponent = WrappedComponent;

    public componentDidMount() {
      if (!this.props.loading) {
        this.props.readExercise(this.props.match.params.id);
      }
    }

    public render() {
      const { readExercise, history, ...props } = this.props as InjectedProps &
        SubstractedProps;

      return <WrappedComponent {...props} />;
    }
  }

  const mapStateToProps = (
    state: RootState,
    { match: { params } }: RouteComponentProps<{ id: string }>,
  ) => ({
    errors: getExercisesError(state.exercises),
    exercise: getExerciseById(state.exercises, params.id),
    loading: getExercisesLoading(state.exercises),
  });

  return connect(
    mapStateToProps,
    { readExercise: (exerciseId: string) => exercisesRead.request(exerciseId) },
  )(WithExercise);
};
