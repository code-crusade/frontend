import { Button, HTMLTable, Intent, Tag } from '@blueprintjs/core';
import { isEmpty } from 'lodash';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Difficulties } from '../../../__generated__/api';
import { Err404 } from '../../../components/Err404';
import { Loading } from '../../../components/Loading';
import { WithExercisesInjectedProps } from '../hocs/withExercises';

const Container = styled.div`
  padding: 1em;
  max-width: 960px;
`;

const RightAlignedTh = styled.th`
  display: grid;
  justify-content: right;
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
            <th>#</th>
            <th>Titre</th>
            <th>Difficulté</th>
            <RightAlignedTh>
              <Link to={`/exercises/add`}>
                <Button rightIcon="add" text="Ajouter" />
              </Link>
            </RightAlignedTh>
          </tr>
        </thead>
        <tbody>
          {Object.keys(props.exercises).map((key, index) => (
            <tr key={key}>
              <td>{props.exercises[key].id}</td>
              <td>{props.exercises[key].title.fr}</td>
              <td>
                {(() => {
                  switch (props.exercises[key].difficulty) {
                    case Difficulties.EASY:
                      return <Tag intent={Intent.SUCCESS}>Facile</Tag>;
                    case Difficulties.MEDIUM:
                      return <Tag intent={Intent.WARNING}>Moyen</Tag>;
                    case Difficulties.HARD:
                      return <Tag intent={Intent.DANGER}>Difficile</Tag>;
                    default:
                      return <Tag>Unknown</Tag>;
                  }
                })()}
              </td>
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
