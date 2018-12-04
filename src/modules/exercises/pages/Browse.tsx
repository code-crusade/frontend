import * as React from 'react';
import { compose } from 'redux';
import {
  withLoggedInUser,
  WithLoggedInUserInjectedProps,
} from '../../auth/hocs/withLoggedInUser';
import { ExercisesBrowse } from '../components/ExercisesBrowse';
import {
  withExercises,
  WithExercisesInjectedProps,
} from '../hocs/withExercises';

export class Browse extends React.Component<
  WithExercisesInjectedProps & WithLoggedInUserInjectedProps
> {
  render() {
    const { exercises, loading, error } = this.props;

    return (
      <ExercisesBrowse exercises={exercises} loading={loading} error={error} />
    );
  }
}

export const ExercisesBrowsePage = compose(
  withLoggedInUser,
  withExercises,
)(Browse);
