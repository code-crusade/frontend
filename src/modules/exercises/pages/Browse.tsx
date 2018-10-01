import { Button, HTMLTable } from '@blueprintjs/core';
import { isEmpty } from 'lodash';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Err404 } from '../../../components/Err404';
import { Loading } from '../../../components/Loading';
import { InjectedProps, withExercises } from '../hocs/withExercises';

const Container = styled.div`
  display: grid;
  justify-items: start;
`;

export class Browse extends React.PureComponent<InjectedProps> {
  render() {
    const { exercises, loading, error } = this.props;

    if (loading) {
      return <Loading />;
    }

    if (error || isEmpty(exercises)) {
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
            {Object.keys(exercises).map((key, index) => (
              <tr key={key}>
                <td>{exercises[key].title.fr}</td>
                <td>{exercises[key].description.fr}</td>
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
  }
}

export const ExercicesBrowsePage = withExercises(Browse);
