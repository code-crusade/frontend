import {
  Button,
  ControlGroup,
  FormGroup,
  HTMLSelect,
  InputGroup,
} from '@blueprintjs/core';
import { Form } from 'formik';
import * as React from 'react';
import { Semesters } from 'src/config/enums';
import { DragAndDrop } from 'src/modules/groups/components/DragAndDrop';
import { GroupsAddProps } from './GroupsAdd';

const semestersOptions = [
  { label: 'Automne', value: Semesters.FALL },
  { label: 'Hiver', value: Semesters.WINTER },
  { label: 'Été', value: Semesters.SUMMER },
];
export class GroupsAddForm extends React.Component<GroupsAddProps> {
  render() {
    return (
      <Form>
        <FormGroup label="Sigle du cours">
          <InputGroup
            type="text"
            name="class"
            placeholder="Sigle du cours"
            value="LOG320"
          />
        </FormGroup>
        <FormGroup label="Groupe">
          <InputGroup
            type="number"
            name="group"
            placeholder="Numéro de groupe"
          />
        </FormGroup>
        <ControlGroup fill>
          <FormGroup label="Session">
            <HTMLSelect large name="semester" options={semestersOptions} />
          </FormGroup>
          <FormGroup label="Année">
            <InputGroup
              type="number"
              name="group"
              placeholder="Année"
              value={new Date().getFullYear().toString()}
            />
          </FormGroup>
        </ControlGroup>
        <FormGroup label="Importer des étudiants">
          <DragAndDrop
            text="Cliquer ou déposer ici le fichier Excel contenant la liste des étudiants"
            onDrop={this.props.onDrop}
            formats={['ods', 'xlsx', 'xls']}
          />
        </FormGroup>
        <Button type="submit" intent="primary" large icon="add">
          Ajouter
        </Button>
      </Form>
    );
  }
}
