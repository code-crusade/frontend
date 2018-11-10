import { Dictionary, pickBy } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { groupsArchive } from '../actions';
import { GroupsBrowse } from '../components/GroupsBrowse';
import { withGroups, WithGroupsInjectedProps } from '../hocs/withGroups';
import { Group } from '../models';

interface BrowseProps extends WithGroupsInjectedProps {
  onArchiveGroupClick(groupId: string, archived: boolean): void;
}

interface BrowseState {
  selectedGroup?: Group;
  currentGroups: Dictionary<Group>;
  archivedGroups: Dictionary<Group>;
}

class Browse extends React.PureComponent<BrowseProps, BrowseState> {
  private filterGroups = (archived: boolean) =>
    pickBy(this.props.groups, (group) => group.archived === archived);

  state = {
    selectedGroup: undefined,
    currentGroups: this.filterGroups(false),
    archivedGroups: this.filterGroups(true),
  };

  readonly handleClickSelectGroup = (groupId: string) => {
    this.setState({ selectedGroup: this.props.groups[groupId] });
  };

  readonly handleClickArchive = (groupId: string, archived: boolean) => {
    this.props.onArchiveGroupClick(groupId, archived);
    this.setState({
      currentGroups: this.filterGroups(false),
      archivedGroups: this.filterGroups(true),
    });
  };

  render() {
    return (
      <GroupsBrowse
        {...this.props}
        onArchiveGroupClick={this.handleClickArchive}
        onGroupClick={this.handleClickSelectGroup}
        selectedGroup={this.state.selectedGroup}
        currentGroups={this.state.currentGroups}
        archivedGroups={this.state.archivedGroups}
      />
    );
  }
}

const mapDispatchToProps = {
  onArchiveGroupClick: (groupId: string, archived: boolean) =>
    groupsArchive.request({ groupId, archived }),
};

export const GroupsBrowsePage = compose(
  withGroups,
  connect(
    null,
    mapDispatchToProps,
  ),
)(Browse);
