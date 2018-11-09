import * as React from 'react';
import { GroupsBrowse } from '../components/GroupsBrowse';
import { withGroups, WithGroupsInjectedProps } from '../hocs/withGroups';
import { Group } from '../models';

interface BrowseState {
  selectedGroup?: Group;
}

class Browse extends React.PureComponent<WithGroupsInjectedProps, BrowseState> {
  state = {
    selectedGroup: undefined,
  };

  handleClickSelectGroup = (groupId: string) => {
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
