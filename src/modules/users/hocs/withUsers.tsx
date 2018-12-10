import * as React from 'react';
import { connect } from 'react-redux';
import { User } from '../../../__generated__/api';
import { RootState } from '../../../store/root-reducer';
import { usersBrowse } from '../actions';
import { getUsers, getUsersError, getUsersLoading } from '../selectors';

// These props will be subtracted from original component type
export interface WithUsersInjectedProps {
  loading: boolean;
  error: Error;
  users: { [key: string]: User };
}

interface SubstractedProps {
  browseUsers: () => void;
}

export const withUsers = <WrappedProps extends WithUsersInjectedProps>(
  WrappedComponent: React.ComponentType<WrappedProps>,
) => {
  class WithUsers extends React.Component<
    SubstractedProps & WithUsersInjectedProps
  > {
    // Enhance component name for debugging and ReactDevTools
    public static displayName = `withUsers(${WrappedComponent.name})`;
    // reference to original wrapped component
    public static readonly WrappedComponent = WrappedComponent;

    public componentDidMount() {
      if (!this.props.loading) {
        this.props.browseUsers();
      }
    }

    public render() {
      const { browseUsers, ...props } = this.props as WithUsersInjectedProps &
        SubstractedProps;

      return <WrappedComponent {...props as any} />;
    }
  }

  const mapStateToProps = (state: RootState) => ({
    errors: getUsersError(state.users),
    users: getUsers(state.users),
    loading: getUsersLoading(state.users),
  });

  return connect(
    mapStateToProps,
    { browseUsers: () => usersBrowse.request() },
  )(WithUsers);
};
