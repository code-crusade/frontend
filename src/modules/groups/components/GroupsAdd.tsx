import * as React from 'react';
import { Semesters } from 'src/config/enums';
import styled from 'styled-components';
import { Student } from '../models';
import { GroupsAddFormik, OnSubmitGroupsAdd } from './GroupsAddForm';
import { StudentsTable } from './StudentsTable';

const Container = styled.div`
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
`;

const StyledGroupsAdd = styled.div`
  padding: 10px;
  padding-right: 20px;
  border-right: 3px dashed #3c4c5940;
`;

const StyledPreviewStudents = styled.div`
  padding: 10px;
  padding-left: 20px;
`;

export type OnDrop = {
  onDrop(acceptedFiles: any): void;
};

export interface GroupsAddProps extends OnSubmitGroupsAdd, OnDrop {
  students: Student[];
}

export const GroupsAdd: React.SFC<GroupsAddProps> = (props) => {
  const { students } = props;
  return (
    <Container>
      <StyledGroupsAdd>
        <h1>Nouveau groupe</h1>
        <GroupsAddFormik
          initialValues={{
            class: 'LOG320',
            year: new Date().getFullYear(),
            semester: Semesters.FALL,
            groupNumber: 1,
          }}
          {...props}
        />
      </StyledGroupsAdd>
      <StyledPreviewStudents>
        <h1>Aperçu des étudiants</h1>
        <StudentsTable students={students} />
      </StyledPreviewStudents>
    </Container>
  );
};
