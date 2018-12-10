import { Button, Callout, Divider } from '@blueprintjs/core';
import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 50%;
`;

export const Login: React.FunctionComponent = (props) => {
  return (
    <Container>
      <h1>Connexion</h1>
      <Callout
        intent="primary"
        title="Connectez-vous avec votre compte Google de l'ÉTS"
      >
        <p>
          Afin d'utiliser ce service, vous devez respectez ces <u>deux</u>{' '}
          conditions:
          <ul>
            <li>
              Être inscrit au cours <strong>LOG320</strong> (Structures de
              données et algorithmes) enseigné par Patrick Cardinal
            </li>
            <li>
              Avoir un compte Google de l'ÉTS (se termine par{' '}
              <strong>@etsmtl.net</strong>)
            </li>
          </ul>
          Vous allez être redirigé(e) vers la page de connexion de Google.{' '}
          <br />
          Note: Seule votre <strong>adresse courriel</strong> sera récupérée
          afin de valider que vous êtes bien inscrit au cours.
        </p>
      </Callout>
      <Divider />
      <Button intent="success" large>
        Se connecter
      </Button>
    </Container>
  );
};
