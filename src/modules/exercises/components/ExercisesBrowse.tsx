import { Button, HTMLTable } from '@blueprintjs/core';
import { isEmpty } from 'lodash';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Err404 } from '../../../components/Err404';
import { Loading } from '../../../components/Loading';
import { WithExercisesInjectedProps } from '../hocs/withExercises';

const Container = styled.div`
  padding: 1em;
  max-width: 960px;
`;

export const ExercisesBrowse: React.SFC<WithExercisesInjectedProps> = (
  props,
) => {
  if (props.loading) {
    return <Loading />;
  }

  if (props.error || isEmpty(props.exercises)) {
    return <Err404 />;
  }
  return (
    <Container>
      <h1>Exercices</h1>
      <HTMLTable>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {Object.keys(props.exercises).map((key, index) => (
            <tr key={key}>
              <td>{props.exercises[key].title.fr}</td>
              <td>{props.exercises[key].description.fr}</td>
              <td>
                <Link to={`/exercises/${key}`}>
                  <Button
                    rightIcon="arrow-right"
                    intent="success"
                    text="Commencer"
                  />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </HTMLTable>
    </Container>
  );
};
