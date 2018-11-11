import { Callout, HTMLTable } from '@blueprintjs/core';
import { isEmpty } from 'lodash';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Group } from '../../../__generated__/api';

const Table = styled(HTMLTable)`
  width: 100%;
`;

interface GroupsTableProps {
  readonly groups: { [key: number]: Group };
  archive?: boolean;
  onGroupClick(groupId: number): void;
}

export const GroupsTable: React.SFC<GroupsTableProps> = (props) => {
  const { groups, onGroupClick, archive } = props;

  const handleGroupClick = (id: number) => onGroupClick(id);

  return isEmpty(groups) ? (
    <React.Fragment>
      {!archive && (
        <Callout title="Aucun groupe existant" intent="primary">
          Créer un nouveau groupe en <Link to="groups/add">cliquant ici</Link>
        </Callout>
      )}
    </React.Fragment>
  ) : (
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
            <td>{group._class}</td>
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
