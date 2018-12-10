import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { User } from '../../../__generated__/api';
import { RootState } from '../../../store/root-reducer';
import { usersRead } from '../actions';
import { getUserById, getUsersError, getUsersLoading } from '../selectors';

// These props will be subtracted from original component type
export interface WithUserInjectedProps {
  loading: boolean;
  error: Error;
  user: User;
}

interface SubstractedProps extends RouteComponentProps<{ id: string }> {
  readUser: (id: number) => void;
}

export const withUser = <WrappedProps extends WithUserInjectedProps>(
  WrappedComponent: React.ComponentType<WrappedProps>,
) => {
  class WithUser extends React.Component<
    SubstractedProps & WithUserInjectedProps
  > {
    // Enhance component name for debugging and ReactDevTools
    public static displayName = `withUser(${WrappedComponent.name})`;
    // reference to original wrapped component
    public static readonly WrappedComponent = WrappedComponent;

    public componentDidMount() {
      if (!this.props.loading) {
        this.props.readUser(Number(this.props.match.params.id));
      }
    }

    public render() {
      const { readUser, history, ...props } = this
        .props as WithUserInjectedProps & SubstractedProps;

      return <WrappedComponent {...props as any} />;
    }
  }

  const mapStateToProps = (
    state: RootState,
    { match: { params } }: RouteComponentProps<{ id: string }>,
  ) => ({
    errors: getUsersError(state.users),
    user: getUserById(state.users, Number(params.id)),
    loading: getUsersLoading(state.users),
  });

  return connect(
    mapStateToProps,
    { readUser: (userId: number) => usersRead.request(userId) },
  )(WithUser);
};
