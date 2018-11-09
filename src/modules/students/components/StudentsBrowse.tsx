import { Button, HTMLTable } from '@blueprintjs/core';
import * as React from 'react';
import styled from 'styled-components';
import { Student } from '../models';

const Table = styled(HTMLTable)`
  width: 100%;
`;

interface StudentsBrowseProps {
  students: Student[];
}

export class StudentsBrowse extends React.PureComponent<StudentsBrowseProps> {
  render() {
    const { students } = this.props;

    // TODO: If 0 students, ask to import students. (so register students in the group)
    // TODO: ?? Add manually a student to group
    if (students.length === 0) {
      return <div>Aucun étudiant</div>;
    }

    return (
      <div>
        <h2>Étudiants</h2>
        <Table>
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Code d'accès</th>
              <th>Email</th>
              <th>Exercices réussis</th>
              <th>Excercices terminés</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.accessCode}>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.accessCode}</td>
                <td>{student.email}</td>
                <td>{student.totalExercisesDone || 0}</td>
                <td>{student.totalExercisesSuccessed || 0}</td>
                <td>
                  <Button
                    intent="success"
                    title="Va lancer un modal dans le future"
                    disabled
                  >
                    Consulter
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
