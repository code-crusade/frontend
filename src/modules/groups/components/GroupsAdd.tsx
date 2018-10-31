import { Callout, HTMLTable } from '@blueprintjs/core';
import * as React from 'react';
import styled from 'styled-components';
import { GroupsAddForm } from './GroupsAddForm';

export interface GroupsAddProps {
  onDrop(acceptedFiles: any): void;
  students: any; // TODO: Type students
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
`;

const WithPadding = styled.div`
  padding: 10px;
`;

export const GroupsAdd: React.SFC<GroupsAddProps> = (props) => {
  return (
    <Container>
      <WithPadding>
        <h1>Nouveau groupe</h1>
        <GroupsAddForm {...props} />
      </WithPadding>
      <WithPadding>
        <h1>Aperçu des étudiants</h1>
        <Callout intent="primary" title="Déposer un fichier Excel">
          <p>
            Pour activer l'aperçu, déposer un fichier Excel (format .osd)
            contenat la liste d'étudiants. Vous trouverez ci-dessous un exemple
            du format attendu.
          </p>
          <HTMLTable>
            <thead>
              <tr>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Code d'accès</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Guy</td>
                <td>Tremblay</td>
                <td>AN12345</td>
                <td>guy.tremblay.1@ens.etsmtl.ca</td>
              </tr>
            </tbody>
          </HTMLTable>
        </Callout>
      </WithPadding>
    </Container>
  );
};
