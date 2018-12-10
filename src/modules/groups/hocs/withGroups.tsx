import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from 'src/store/root-reducer';
import { Group } from '../../../__generated__/api';
import { groupsBrowse } from '../actions';
import { getGroups, getGroupsError, getGroupsLoading } from '../selectors';

// These props will be subtracted from original component type
export interface WithGroupsInjectedProps {
  loading: boolean;
  error: Error;
  groups: { [key: string]: Group };
}

interface SubstractedProps {
  browseGroups: () => void;
}

export const withGroups = <WrappedProps extends WithGroupsInjectedProps>(
  WrappedComponent: React.ComponentType<WrappedProps>,
) => {
  class WithGroups extends React.Component<
    SubstractedProps & WithGroupsInjectedProps
  > {
    // Enhance component name for debugging and ReactDevTools
    public static displayName = `withGroups(${WrappedComponent.name})`;
    // reference to original wrapped component
    public static readonly WrappedComponent = WrappedComponent;

    public componentDidMount() {
      if (!this.props.loading) {
        this.props.browseGroups();
      }
    }

    public render() {
      const { browseGroups, ...props } = this.props as WithGroupsInjectedProps &
        SubstractedProps;

      return <WrappedComponent {...props as any} />;
    }
  }

  const mapStateToProps = (state: RootState) => ({
    errors: getGroupsError(state.groups),
    groups: getGroups(state.groups),
    loading: getGroupsLoading(state.groups),
  });

  return connect(
    mapStateToProps,
    { browseGroups: () => groupsBrowse.request() },
  )(WithGroups);
};
