import * as React from 'react';

export interface WithLoggedInUserProps {
  user?: { id: string };
  isLoggedIn: boolean;
}

export const withLoggedInUser = (Component: any) => {
  return (props: any) => {
    // TODO: Implement this
    const user = null;
    const isLoggedIn = !!user;

    return (
      <Component
        {...props}
        user={isLoggedIn ? user : undefined}
        isLoggedIn={isLoggedIn}
      />
    );
  };
};
