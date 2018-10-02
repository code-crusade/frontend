import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../store/root-reducer';
import { exerciseSubmissionsBrowse } from '../actions';
import { Exercise } from '../models';
import {
  getExerciseSubmissions,
  getExerciseSubmissionsError,
  getExerciseSubmissionsLoading,
} from '../selectors';

// These props will be subtracted from original component type
export interface WithExerciseSubmissionsInjectedProps {
  loading: boolean;
  error: Error;
  exercises: { [key: string]: Exercise };
}

interface SubstractedProps {
  browseExerciseSubmissions: () => void;
}

export const withExerciseSubmissions = <
  WrappedProps extends WithExerciseSubmissionsInjectedProps
>(
  WrappedComponent: React.ComponentType<WrappedProps>,
) => {
  class WithExerciseSubmissions extends React.Component<
    SubstractedProps & WithExerciseSubmissionsInjectedProps
  > {
    // Enhance component name for debugging and ReactDevTools
    public static displayName = `withExerciseSubmissions(${
      WrappedComponent.name
    })`;
    // reference to original wrapped component
    public static readonly WrappedComponent = WrappedComponent;

    public componentDidMount() {
      if (!this.props.loading) {
        this.props.browseExerciseSubmissions();
      }
    }

    public render() {
      const { browseExerciseSubmissions, ...props } = this
        .props as WithExerciseSubmissionsInjectedProps & SubstractedProps;

      return <WrappedComponent {...props} />;
    }
  }

  const mapStateToProps = (state: RootState) => ({
    errors: getExerciseSubmissionsError(state.exerciseSubmissions),
    exerciseSubmissions: getExerciseSubmissions(state.exerciseSubmissions),
    loading: getExerciseSubmissionsLoading(state.exerciseSubmissions),
  });

  return connect(
    mapStateToProps,
    { browseExerciseSubmissions: () => exerciseSubmissionsBrowse.request() },
  )(WithExerciseSubmissions);
};
