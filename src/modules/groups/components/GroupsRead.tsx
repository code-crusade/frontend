import { Button, Callout, Tag } from '@blueprintjs/core';
import { isEmpty } from 'lodash';
import * as React from 'react';
import { SpaceBetween } from 'src/components/styled';
import { StudentsBrowse } from 'src/modules/students/components/StudentsBrowse';
import styled from 'styled-components';
import { Group } from '../models';

interface GroupsReadProps {
  group?: Group;
}

const Buttons = styled.div`
  height: fit-content;
  align-self: center;
  margin-left: 5px;
`;

const Spacy = styled.div`
  margin: 25px 0;
`;

export const GroupsRead: React.SFC<GroupsReadProps> = (props) => {
  if (isEmpty(props.group)) {
    return (
      <React.Fragment>
        <h1>Aperçu</h1>
        <Callout intent="none" title="Aucun groupe sélectionné">
          Sélectionner un groupe dans le panneau de gauche pour afficher la
          liste d'étudiants
        </Callout>
      </React.Fragment>
    );
  }
  const group = props.group!;

  return (
    <React.Fragment>
      <SpaceBetween>
        <h1>Groupe 0{group.groupNumber}</h1>
        <Buttons>
          <Button
            intent="primary"
            icon="edit"
            style={{ marginRight: '10px' }}
            disabled
          >
            Modifier
          </Button>
          <Button intent="warning" icon="disable" disabled>
            Archiver
          </Button>
        </Buttons>
      </SpaceBetween>
      <Tag intent="primary">
        {group.semester} {group.year}
      </Tag>
      <Spacy />
      <StudentsBrowse students={group.students} />
    </React.Fragment>
  );
};
