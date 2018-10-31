import {
  Alignment,
  Button,
  Classes,
  Menu,
  MenuItem,
  Navbar as BluePrintNavBar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Popover,
  Position,
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { History } from 'history';
import * as React from 'react';
import { compose, withProps } from 'recompose';
import styled from 'styled-components';
import { omitProps } from '../../../hocs/omitProps';

export type AppNavbarProps = {
  onHomeClick(): void;
  onExercisesClick(): void;
  onLoginClick(): void;
  onLogoutClick(): void;
  onProfileClick(): void;
  isLoggedIn: boolean;
};

const StyledNavbar = styled(BluePrintNavBar)`
  grid-row: 1
  grid-column: 1
`;

export const Navbar: React.SFC<AppNavbarProps> = (props) => (
  <StyledNavbar className="bp3-dark">
    <NavbarGroup align={Alignment.LEFT}>
      <NavbarHeading>
        <img srcSet="/images/rabbit.svg" alt="Logo rabbit" width={32} />
      </NavbarHeading>
      <NavbarHeading>Code Crusade</NavbarHeading>
      <NavbarDivider />
      <Button
        className={Classes.MINIMAL}
        icon={IconNames.HOME}
        text="Accueil"
        onClick={props.onHomeClick}
      />
      <Button
        className={Classes.MINIMAL}
        icon={IconNames.ANNOTATION}
        text="Excercices"
        onClick={props.onExercisesClick}
      />
    </NavbarGroup>
    <NavbarGroup align={Alignment.RIGHT}>
      {props.isLoggedIn ? (
        <Popover
          minimal={true}
          position={Position.BOTTOM}
          content={
            <Menu>
              <MenuItem
                icon={IconNames.COG}
                text="Paramètres"
                onClick={props.onProfileClick}
              />
              <MenuItem
                icon={IconNames.LOG_OUT}
                text="Se déconnecter"
                onClick={props.onLogoutClick}
              />
            </Menu>
          }
        >
          <Button className={Classes.MINIMAL} icon="user" text="Patrick" />
        </Popover>
      ) : (
        <Button
          className={Classes.MINIMAL}
          icon={IconNames.LOG_IN}
          text="Se connecter"
          onClick={props.onLoginClick}
        />
      )}
    </NavbarGroup>
  </StyledNavbar>
);

export const AppNavbar = compose<any, any>(
  withProps((ownerProps: { history: History }) => ({
    onHomeClick: () => {
      ownerProps.history.push('/');
    },
    onExercisesClick: () => {
      ownerProps.history.push('/exercises');
    },
    onLoginClick: () => {
      ownerProps.history.push('/auth/login');
    },
    onLogoutClick: () => {
      ownerProps.history.push('/auth/logout');
    },
    onProfileClick: () => {
      ownerProps.history.push('/users/me');
    },
  })),
  omitProps(['history']),
)(Navbar);
