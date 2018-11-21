import { Callout, HTMLTable } from '@blueprintjs/core';
import { Dictionary, isEmpty } from 'lodash';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Group } from '../../../__generated__/api';

const Table = styled(HTMLTable)`
  width: 100%;
`;

interface GroupsTableProps {
  readonly groups: Dictionary<Group>;
  archive?: boolean;
  onGroupClick(id: number): void;
}

export const GroupsTable: React.SFC<GroupsTableProps> = (props) => {
  const { groups, onGroupClick, archive } = props;

  const handleGroupClick = (id: number) => onGroupClick(id);

  if (isEmpty(groups)) {
    if (archive) {
      return <Callout title="Aucun groupe archivé existant" intent="primary" />;
    }

    return (
      <Callout title="Aucun groupe en cours existant" intent="primary">
        Créer un nouveau groupe en <Link to="groups/add">cliquant ici</Link>
      </Callout>
    );
  }

  return (
    <Table interactive>
      <thead>
        <tr>
          <th>Numéro</th>
          <th>Cours</th>
          <th>Session</th>
          <th>Nombre d'étudiants</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(groups).map((group, index) => (
          <tr onClick={() => handleGroupClick(group.id)} key={group.id}>
            <td>{group.groupNumber}</td>
            <td>{group.course}</td>
            <td>
              {group.semester} {group.year}
            </td>
            <td>{group.students.length}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
