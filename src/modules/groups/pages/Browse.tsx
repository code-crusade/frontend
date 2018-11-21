import { Dictionary, pickBy } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Group } from '../../../__generated__/api';
import { groupsArchive } from '../actions';
import { GroupsBrowse } from '../components/GroupsBrowse';
import { withGroups, WithGroupsInjectedProps } from '../hocs/withGroups';

interface BrowseProps extends WithGroupsInjectedProps {
  onArchiveGroupClick(id: number, archived: boolean): void;
}

interface BrowseState {
  selectedGroup?: Group;
  currentGroups: Dictionary<Group>;
  archivedGroups: Dictionary<Group>;
}

class Browse extends React.Component<BrowseProps, BrowseState> {
  private filterGroups = (archived: boolean) => {
    return pickBy(this.props.groups, (group) => group.archived === archived);
  };

  state = {
    selectedGroup: undefined,
    currentGroups: this.filterGroups(false),
    archivedGroups: this.filterGroups(true),
  };

  readonly handleClickSelectGroup = (id: number) => {
    this.setState({ selectedGroup: this.props.groups[id] });
  };

  readonly handleClickArchive = (id: number, archived: boolean) => {
    this.props.onArchiveGroupClick(Number(id), archived);
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
  onArchiveGroupClick: (id: number, archived: boolean) =>
    groupsArchive.request({ id, archived }),
};

export const GroupsBrowsePage = compose(
  withGroups,
  connect(
    null,
    mapDispatchToProps,
  ),
)(Browse);
