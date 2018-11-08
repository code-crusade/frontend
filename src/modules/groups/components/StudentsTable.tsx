import { Callout, HTMLTable } from '@blueprintjs/core';
import { isEmpty } from 'lodash';
import * as React from 'react';
import { Student } from '../models';

interface StudentsTableProps {
  students: Student[];
}

/** Generate HTML Table from javascript object */
export const StudentsTable: React.SFC<StudentsTableProps> = (props) => {
  const { students } = props;
  return (
    <React.Fragment>
      {isEmpty(students) ? (
        <Callout intent="primary" title="Déposer un fichier Excel">
          <p>
            Pour activer l'aperçu, déposer un fichier Excel contenat la liste
            d'étudiants. Vous trouverez ci-dessous un exemple du format attendu.
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
      ) : (
        <div>
          <Callout title="Fichier Excel importé" intent="success">
            Voici une prévisualisation des {students.length} étudiants
          </Callout>
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
              {students.map((student) => (
                <tr key={student.accessCode}>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.accessCode}</td>
                  <td>{student.email}</td>
                </tr>
              ))}
            </tbody>
          </HTMLTable>
        </div>
      )}
    </React.Fragment>
  );
};
