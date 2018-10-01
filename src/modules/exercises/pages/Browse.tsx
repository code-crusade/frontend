import { Cell, Column, Table } from '@blueprintjs/table';
import * as React from 'react';
import { Exercise } from '../models';

interface ExercicesBrowseProps {
  exercices: Exercise[];
}

export class ExercicesBrowsePage extends React.PureComponent<
  ExercicesBrowseProps
> {
  static defaultProps = {
    exercices: [
      {
        id: '1',
        title: 'Hello World',
        description: 'Hi from the World!',
        unitTests: undefined,
      },
      {
        id: '2',
        title: 'Hello 2',
        description: 'Hi from the World 2',
        unitTests: undefined,
      },
    ],
  };

  getCellRenderer(key: string) {
    return (row: number) => <Cell>{this.props.exercices[row][key]}</Cell>;
  }

  render() {
    const { exercices } = this.props;

    return (
      <div>
        <h1>Exercices</h1>
        <Table numRows={exercices.length}>
          <Column name="Titre" cellRenderer={this.getCellRenderer('title')} />
          <Column
            name="Description"
            cellRenderer={this.getCellRenderer('description')}
          />
        </Table>
      </div>
    );
  }
}
