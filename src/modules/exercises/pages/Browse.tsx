import * as React from 'react';
import { ExercisesBrowse } from '../components/ExercisesBrowse';
import {
  withExercises,
  WithExercisesInjectedProps,
} from '../hocs/withExercises';

export class Browse extends React.PureComponent<WithExercisesInjectedProps> {
  render() {
    const { exercises, loading, error } = this.props;

    return (
      <ExercisesBrowse exercises={exercises} loading={loading} error={error} />
    );
  }
}

export const ExercicesBrowsePage = withExercises(Browse);
