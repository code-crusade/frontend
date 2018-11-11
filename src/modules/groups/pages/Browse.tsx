import * as React from 'react';
import { Group } from '../../../__generated__/api';
import { GroupsBrowse } from '../components/GroupsBrowse';
import { withGroups, WithGroupsInjectedProps } from '../hocs/withGroups';

interface BrowseState {
  selectedGroup?: Group;
}

class Browse extends React.PureComponent<WithGroupsInjectedProps, BrowseState> {
  state = {
    selectedGroup: undefined,
  };

  handleClickSelectGroup = (groupId: number) => {
    this.setState({ selectedGroup: this.props.groups[groupId] });
  };

  render() {
    return (
      <GroupsBrowse
        {...this.props}
        onGroupClick={this.handleClickSelectGroup}
        selectedGroup={this.state.selectedGroup}
      />
    );
  }
}

export const GroupsBrowsePage = withGroups(Browse);
