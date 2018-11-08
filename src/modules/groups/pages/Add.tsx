import * as React from 'react';
import { read, utils } from 'xlsx';
import { GroupsAdd } from '../components/GroupsAdd';
import { Student } from '../models';

/** Convert content from Excels to actual students */
function convertToStudents(content: object[]): Student[] {
  const students: Student[] = [];
  content.forEach((row, i) => {
    if (i === 0) return; // Skip header
    students.push({
      firstName: row[0],
      lastName: row[1],
      accessCode: row[2],
      email: row[3],
    });
  });
  return students;
}

interface GroupsAddState {
  students: Student[];
}

export class GroupsAddPage extends React.Component<{}, GroupsAddState> {
  readonly state = {
    students: [],
  };

  /** OnDrop will be called when user drop an Excel file  */
  onDrop = (acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result;
        const workbook = read(content, { type: 'binary' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = utils.sheet_to_json(firstSheet, { header: 1 }); // Need to specify {header: 1} in order to use indexes instead of Excel column names
        const students = convertToStudents(json);
        this.setState({ students });
      };
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.readAsBinaryString(file);
    });
  };

  render() {
    return <GroupsAdd onDrop={this.onDrop} students={this.state.students} />;
  }
}
