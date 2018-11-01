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
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { History } from 'history';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { compose, withProps } from 'recompose';
import styled from 'styled-components';
import { omitProps } from '../../../hocs/omitProps';

export type AppNavbarProps = {
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onProfileClick: () => void;
  isLoggedIn: boolean;
};

const StyledNavbar = styled(BluePrintNavBar)`
  grid-row: 1
  grid-column: 1
`;

export const Navbar: React.SFC<AppNavbarProps> = (props) => (
  <StyledNavbar>
    <NavbarGroup align={Alignment.LEFT}>
      <NavbarHeading>Code Crusade</NavbarHeading>
      <NavbarDivider />
      <Link to="/">
        <Button
          className={Classes.MINIMAL}
          icon={IconNames.HOME}
          text="Accueil"
        />
      </Link>
      <Link to="/exercises">
        <Button
          className={Classes.MINIMAL}
          icon={IconNames.ANNOTATION}
          text="Exercises"
        />
      </Link>
    </NavbarGroup>
    <NavbarGroup align={Alignment.RIGHT}>
      <Popover
        minimal={true}
        content={
          // https://github.com/palantir/blueprint/issues/185
          <Menu>
            {props.isLoggedIn ? (
              <React.Fragment>
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
              </React.Fragment>
            ) : (
              <MenuItem
                icon={IconNames.LOG_IN}
                text="Se connecter"
                onClick={props.onLoginClick}
              />
            )}
          </Menu>
        }
      >
        <Button className={Classes.MINIMAL} icon="cog" />
      </Popover>
    </NavbarGroup>
  </StyledNavbar>
);

export const AppNavbar = compose<any, any>(
  withProps((ownerProps: { history: History }) => ({
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
