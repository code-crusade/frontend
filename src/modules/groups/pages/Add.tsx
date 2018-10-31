import * as React from 'react';
import { GroupsAdd } from '../components/GroupsAdd';

export class GroupsAddPage extends React.Component {
  readonly state = {
    students: {},
  };

  onDrop = (acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();
      reader.onload = () => {
        const fileAsBinaryString = reader.result as string;

        this.setState({
          students: fileAsBinaryString,
        });
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
