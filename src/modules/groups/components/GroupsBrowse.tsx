import { Tab, Tabs } from '@blueprintjs/core';
import * as React from 'react';
import { Err404 } from 'src/components/Err404';
import { Loading } from 'src/components/Loading';
import { TwoColumnsLayout } from 'src/components/TwoColumnsLayout';
import { WithGroupsInjectedProps } from '../hocs/withGroups';
import { GroupsTable } from './GroupsTable';

export const GroupsBrowse: React.SFC<WithGroupsInjectedProps> = (props) => {
  if (props.loading) {
    return <Loading />;
  }

  if (props.error) {
    return <Err404 />;
  }

  return (
    <TwoColumnsLayout
      leftTitle="Gestion des groupes"
      leftPanel={
        <Tabs selectedTabId="act">
          <Tab
            id="act"
            title="Actuels"
            panel={<GroupsTable groups={props.groups} />}
          />
          <Tab id="arch" title="Archives" />
        </Tabs>
      }
      rightTitle="Étudiants"
      rightPanel={<div />}
    />
  );
};
