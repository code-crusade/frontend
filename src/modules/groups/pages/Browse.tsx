import { Dictionary } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { RootState } from 'src/store/root-reducer';
import { Group } from '../../../__generated__/api';
import { groupsArchive } from '../actions';
import { GroupsBrowse } from '../components/GroupsBrowse';
import { withGroups, WithGroupsInjectedProps } from '../hocs/withGroups';
import { getArchivedGroups, getCurrentGroups } from '../selectors';

interface BrowseProps extends WithGroupsInjectedProps {
  onArchiveGroupClick(id: number, archived: boolean): void;
  currentGroups: Dictionary<Group>;
  archivedGroups: Dictionary<Group>;
}

interface BrowseState {
  selectedGroup?: Group;
}

class Browse extends React.Component<BrowseProps, BrowseState> {
  state = {
    selectedGroup: undefined,
  };

  readonly handleClickSelectGroup = (id: number) => {
    this.setState({ selectedGroup: this.props.groups[id] });
  };

  readonly handleClickArchive = (id: number, archived: boolean) => {
    this.props.onArchiveGroupClick(Number(id), archived);
  };

  render() {
    return (
      <GroupsBrowse
        {...this.props}
        onArchiveGroupClick={this.handleClickArchive}
        onGroupClick={this.handleClickSelectGroup}
        selectedGroup={this.state.selectedGroup}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  currentGroups: getCurrentGroups(state.groups),
  archivedGroups: getArchivedGroups(state.groups),
});

const mapDispatchToProps = {
  onArchiveGroupClick: (id: number, archived: boolean) =>
    groupsArchive.request({ id, archived }),
};

export const GroupsBrowsePage = compose(
  withGroups,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Browse);
