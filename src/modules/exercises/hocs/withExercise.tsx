import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../../store/root-reducer';
import { exercisesRead } from '../actions';
import { Exercise } from '../models';
import {
  getExercises,
  getExercisesError,
  getExercisesLoading,
} from '../selectors';

// These props will be subtracted from original component type
export interface InjectedProps extends RouteComponentProps<{ id: string }> {
  loading: boolean;
  error: Error;
  exercises: Exercise[];
}

interface SubstractedProps {
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
      const { readExercise, ...props } = this.props as InjectedProps &
        SubstractedProps;

      return <WrappedComponent {...props} />;
    }
  }

  const mapStateToProps = (state: RootState) => ({
    errors: getExercisesError(state.exercises),
    exercises: getExercises(state.exercises),
    loading: getExercisesLoading(state.exercises),
  });

  return connect(
    mapStateToProps,
    { readExercise: (exerciseId: string) => exercisesRead.request(exerciseId) },
  )(WithExercise);
};
