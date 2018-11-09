import { Button, Tab, Tabs } from '@blueprintjs/core';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Err404 } from 'src/components/Err404';
import { Loading } from 'src/components/Loading';
import { SpaceBetween } from 'src/components/styled';
import { TwoColumnsLayout } from 'src/components/TwoColumnsLayout';
import styled from 'styled-components';
import { WithGroupsInjectedProps } from '../hocs/withGroups';
import { Group } from '../models';
import { GroupsRead } from './GroupsRead';
import { GroupsTable } from './GroupsTable';

const AddButton = styled(Button)`
  height: fit-content;
  align-self: center;
`;

interface GroupsBrowseProps extends WithGroupsInjectedProps {
  selectedGroup?: Group;
  onGroupClick(groupId: string): void;
}

export const GroupsBrowse: React.SFC<GroupsBrowseProps> = (props) => {
  const { error, loading, selectedGroup } = props;

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Err404 />;
  }

  return (
    <TwoColumnsLayout
      leftHeader={
        <SpaceBetween>
          <p>Gestion des groupes</p>
          <Link to="groups/add">
            <AddButton intent="success" icon="add">
              Ajouter
            </AddButton>
          </Link>
        </SpaceBetween>
      }
      leftPanel={
        <Tabs selectedTabId="act">
          <Tab id="act" title="Actuels" panel={<GroupsTable {...props} />} />
          <Tab id="arch" title="Archives" disabled />
        </Tabs>
      }
      rightPanel={<GroupsRead group={selectedGroup} />}
    />
  );
};
