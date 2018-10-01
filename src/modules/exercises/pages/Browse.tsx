import { Button, HTMLTable } from '@blueprintjs/core';
import { push } from 'connected-react-router';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Exercise } from '../models';

const StyledComponent = styled.div`
  display: grid;
  justify-items: center;
`;

interface ExercicesBrowseProps {
  exercices: Exercise[];
  onExerciceClick(exerciceId: string): any;
}

export class ExercicesBrowsePageBase extends React.PureComponent<
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

  readonly onExerciceClick = (event: any, id: string) =>
    this.props.onExerciceClick(id);

  render() {
    const { exercices } = this.props;
    return (
      <StyledComponent>
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
                    <Button
                      rightIcon="arrow-right"
                      intent="success"
                      text="Commencer"
                      onClick={(event: any) =>
                        this.onExerciceClick(event, ex.id)
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </HTMLTable>
      </StyledComponent>
    );
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    onExerciceClick: (exerciceId: string) =>
      dispatch(push(`/exercises/${exerciceId}`)),
  };
}

export const ExercicesBrowsePage = connect(
  null,
  mapDispatchToProps,
)(ExercicesBrowsePageBase);
