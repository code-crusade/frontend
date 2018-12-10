import * as React from 'react';
import { TwoColumnsLayout } from 'src/components/TwoColumnsLayout';
import { Semesters, Student } from '../../../__generated__/api';
import { StudentsTable } from '../../students/components/StudentsTablePreview';
import { GroupsAddFormik, OnSubmitGroupsAdd } from './GroupsAddForm';

export type OnDrop = {
  onDrop(acceptedFiles: any): void;
};

export interface GroupsAddProps extends OnSubmitGroupsAdd, OnDrop {
  students: Student[];
}

export const GroupsAdd: React.FunctionComponent<GroupsAddProps> = (props) => {
  const { students } = props;
  return (
    <TwoColumnsLayout
      leftHeader="Nouveau groupe"
      leftPanel={
        <GroupsAddFormik
          initialValues={{
            course: 'LOG320',
            year: new Date().getFullYear(),
            semester: Semesters.FALL,
            groupNumber: 1,
            students: [],
            archived: false,
          }}
          {...props}
        />
      }
      rightHeader="Aperçu des étudiants"
      rightPanel={<StudentsTable students={students} />}
    />
  );
};
