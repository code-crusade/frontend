import { Callout, HTMLTable } from '@blueprintjs/core';
import { isEmpty } from 'lodash';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Group } from '../models';

const Table = styled(HTMLTable)`
  width: 100%;
`;

interface GroupsTableProps {
  readonly groups: { [key: string]: Group };
  archive?: boolean;
  onGroupClick?(): void;
}

export const GroupsTable: React.SFC<GroupsTableProps> = (props) => {
  const { groups, onGroupClick, archive } = props;

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
        </tr>
      </thead>
      <tbody>
        {Object.values(groups).map((group, index) => (
          <tr onClick={onGroupClick} key={group.id}>
            <td>{group.groupNumber}</td>
            <td>{group.class}</td>
            <td>
              {group.semster} {group.year}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
