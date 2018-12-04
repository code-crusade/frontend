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
  onNewExerciseClick(): void;
  onGroupsClick(): void;
  onNewGroupClick(): void;
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
      <NavbarHeading>Code Crusade</NavbarHeading>
      <NavbarDivider />
      <Button
        className={Classes.MINIMAL}
        icon={IconNames.HOME}
        text="Accueil"
        onClick={props.onHomeClick}
      />
      <Popover
        minimal={true}
        position={Position.BOTTOM}
        content={
          <Menu>
            <MenuItem
              icon={IconNames.ANNOTATION}
              text="Exercices"
              onClick={props.onExercisesClick}
            />
            <MenuItem
              icon={IconNames.ADD}
              text="Nouveau"
              onClick={props.onNewExerciseClick}
            />
          </Menu>
        }
      >
        <Button
          className={Classes.MINIMAL}
          icon={IconNames.ANNOTATION}
          text="Exercices"
          rightIcon={IconNames.CARET_DOWN}
        />
      </Popover>
      <Popover
        minimal={true}
        position={Position.BOTTOM}
        content={
          <Menu>
            <MenuItem
              icon={IconNames.PEOPLE}
              text="Groupes"
              onClick={props.onGroupsClick}
            />
            <MenuItem
              icon={IconNames.ADD}
              text="Nouveau"
              onClick={props.onNewGroupClick}
            />
          </Menu>
        }
      >
        <Button
          className={Classes.MINIMAL}
          icon={IconNames.PEOPLE}
          text="Groupes"
          rightIcon={IconNames.CARET_DOWN}
        />
      </Popover>
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
          <Button
            className={Classes.MINIMAL}
            icon={IconNames.USER}
            text="Patrick" // TODO: Dynamic display the name
            rightIcon={IconNames.CARET_DOWN}
          />
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
    onNewExerciseClick: () => {
      ownerProps.history.push('/exercises/add');
    },
    onGroupsClick: () => {
      ownerProps.history.push('/groups');
    },
    onNewGroupClick: () => {
      ownerProps.history.push('/groups/add');
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
