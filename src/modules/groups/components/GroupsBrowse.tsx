import { Button, Tab, Tabs } from '@blueprintjs/core';
import { Dictionary } from 'lodash';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Err404 } from 'src/components/Err404';
import { Loading } from 'src/components/Loading';
import { SpaceBetween } from 'src/components/styled';
import { TwoColumnsLayout } from 'src/components/TwoColumnsLayout';
import styled from 'styled-components';
import { Group } from '../../../__generated__/api';
import { WithGroupsInjectedProps } from '../hocs/withGroups';
import { GroupsRead } from './GroupsRead';
import { GroupsTable } from './GroupsTable';

const AddButton = styled(Button)`
  height: fit-content;
  align-self: center;
`;

interface GroupsBrowseProps extends WithGroupsInjectedProps {
  selectedGroup?: Group;
  currentGroups: Dictionary<Group>;
  archivedGroups: Dictionary<Group>;
  onGroupClick(id: number): void;
  onArchiveGroupClick(id: number, archive: boolean): void;
}

export const GroupsBrowse: React.SFC<GroupsBrowseProps> = (props) => {
  const {
    error,
    loading,
    selectedGroup,
    onGroupClick,
    onArchiveGroupClick,
    currentGroups,
    archivedGroups,
  } = props;

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
        <Tabs renderActiveTabPanelOnly animate>
          <Tab
            id="current"
            title="En cours"
            panel={
              <GroupsTable onGroupClick={onGroupClick} groups={currentGroups} />
            }
          />
          <Tab
            id="archives"
            title="Archives"
            disabled={Object.keys(archivedGroups).length === 0}
            panel={
              <GroupsTable
                archive
                onGroupClick={onGroupClick}
                groups={archivedGroups}
              />
            }
          />
        </Tabs>
      }
      rightPanel={
        <GroupsRead
          group={selectedGroup}
          onArchiveClick={onArchiveGroupClick}
        />
      }
    />
  );
};
