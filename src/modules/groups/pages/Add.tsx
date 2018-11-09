import { push } from 'connected-react-router';
import { FormikProps } from 'formik';
import { isEmpty, Omit } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { history } from 'src/services';
import { WithHistory } from 'src/types/types';
import { read, utils } from 'xlsx';
import { groupsAdd } from '../actions';
import { GroupsAdd } from '../components/GroupsAdd';
import { convertToStudents } from '../helpers';
import { Group, Student } from '../models';

interface State {
  students: Student[];
}

interface Props extends WithHistory {
  addGroup(values: Omit<Group, 'id'>): void;
}

class Add extends React.PureComponent<Props, State> {
  readonly state = {
    students: [],
  };

  readonly handleSumbit = (
    values: Omit<Group, 'id'>,
    props: FormikProps<Partial<Group>>,
  ) => {
    // Inject students in values to submit
    values.students = isEmpty(this.state.students) ? [] : this.state.students;

    this.props.addGroup({ ...values });
    history.push('/groups');
  };

  /** Will be called when user drop an Excel file  */
  readonly onFileDrop = (acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Validate Excel file
        const filename = file.name as string;
        if (
          !(
            filename.endsWith('.xls') ||
            filename.endsWith('.xlsx') ||
            filename.endsWith('.ods')
          )
        ) {
          return;
        }

        // Clean up before adding new students
        this.setState({ students: [] });

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
    return (
      <GroupsAdd
        onDrop={this.onFileDrop}
        onSubmit={this.handleSumbit}
        students={this.state.students}
      />
    );
  }
}

const mapDispatchToProps = {
  addGroup: (values: Group) => groupsAdd.request(values),
  push,
};

export const GroupsAddPage = connect(
  null,
  mapDispatchToProps,
)(Add);
