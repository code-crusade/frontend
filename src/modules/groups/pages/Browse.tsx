import * as React from 'react';
import { GroupsBrowse } from '../components/GroupsBrowse';
import { withGroups, WithGroupsInjectedProps } from '../hocs/withGroups';

class Browse extends React.PureComponent<WithGroupsInjectedProps> {
  render() {
    return <GroupsBrowse {...this.props} />;
  }
}

export const GroupsBrowsePage = withGroups(Browse);
