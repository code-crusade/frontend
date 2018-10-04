import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../store/root-reducer';
import { exercisesBrowse } from '../actions';
import { Exercise } from '../models';
import {
  getExercises,
  getExercisesError,
  getExercisesLoading,
} from '../selectors';

// These props will be subtracted from original component type
export interface WithExercisesInjectedProps {
  loading: boolean;
  error: Error;
  exercises: { [key: string]: Exercise };
}

interface SubstractedProps {
  browseExercises: () => void;
}

export const withExercises = <WrappedProps extends WithExercisesInjectedProps>(
  WrappedComponent: React.ComponentType<WrappedProps>,
) => {
  class WithExercises extends React.Component<
    SubstractedProps & WithExercisesInjectedProps
  > {
    // Enhance component name for debugging and ReactDevTools
    public static displayName = `withExercises(${WrappedComponent.name})`;
    // reference to original wrapped component
    public static readonly WrappedComponent = WrappedComponent;

    public componentDidMount() {
      if (!this.props.loading) {
        this.props.browseExercises();
      }
    }

    public render() {
      const { browseExercises, ...props } = this
        .props as WithExercisesInjectedProps & SubstractedProps;

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
    { browseExercises: () => exercisesBrowse.request() },
  )(WithExercises);
};
