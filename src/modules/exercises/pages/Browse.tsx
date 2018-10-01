import { Button, HTMLTable } from '@blueprintjs/core';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Exercise } from '../models';

const Container = styled.div`
  display: grid;
  justify-items: center;
`;

interface ExercicesBrowseProps {
  exercices: Exercise[];
}

export class ExercicesBrowsePage extends React.PureComponent<
  ExercicesBrowseProps
> {
  // TODO: Temporary, remove when we know where to get fake data
  static defaultProps = {
    exercices: [
      {
        id: '1',
        title: 'Hello World',
        description: 'Hi from the World!',
        unitTests: undefined,
      },
      {
        id: '2',
        title: 'Hello 2',
        description: 'Hi from the World 2',
        unitTests: undefined,
      },
    ],
  };

  render() {
    const { exercices } = this.props;
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
            {exercices.map((ex) => {
              return (
                <tr key={ex.id}>
                  <td>{ex.title}</td>
                  <td>{ex.description}</td>
                  <td>
                    <Link to={`/exercises/${ex.id}`}>
                      <Button
                        rightIcon="arrow-right"
                        intent="success"
                        text="Commencer"
                      />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </HTMLTable>
      </Container>
    );
  }
}
