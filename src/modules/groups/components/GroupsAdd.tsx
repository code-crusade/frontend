import * as React from 'react';
import { TwoColumnsLayout } from 'src/components/TwoColumnsLayout';
import { Semesters } from 'src/config/enums';
import { Student } from '../models';
import { GroupsAddFormik, OnSubmitGroupsAdd } from './GroupsAddForm';
import { StudentsTable } from './StudentsTable';

export type OnDrop = {
  onDrop(acceptedFiles: any): void;
};

export interface GroupsAddProps extends OnSubmitGroupsAdd, OnDrop {
  students: Student[];
}

export const GroupsAdd: React.SFC<GroupsAddProps> = (props) => {
  const { students } = props;
  return (
    <TwoColumnsLayout
      leftTitle="Nouveau groupe"
      leftPanel={
        <GroupsAddFormik
          initialValues={{
            class: 'LOG320',
            year: new Date().getFullYear(),
            semester: Semesters.FALL,
            groupNumber: 1,
          }}
          {...props}
        />
      }
      rightTitle="Aperçu des étudiants"
      rightPanel={<StudentsTable students={students} />}
    />
  );
};
