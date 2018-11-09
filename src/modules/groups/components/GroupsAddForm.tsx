import {
  Button,
  Classes,
  ControlGroup,
  FormGroup,
  HTMLSelect,
  InputGroup,
} from '@blueprintjs/core';
import * as classNames from 'classnames';
import { Form, Formik, FormikProps, FormikValues } from 'formik';
import { get } from 'lodash';
import * as React from 'react';
import { Omit } from 'react-redux';
import { Semesters } from 'src/config/enums';
import { DragAndDrop } from 'src/modules/groups/components/DragAndDrop';
import * as Yup from 'yup';
import { Group } from '../models';
import { OnDrop } from './GroupsAdd';

const semestersOptions = [
  { label: 'Automne', value: Semesters.FALL },
  { label: 'Hiver', value: Semesters.WINTER },
  { label: 'Été', value: Semesters.SUMMER },
];

type FormProps = OnDrop & FormikProps<Group>;

class GroupsAddForm extends React.PureComponent<FormProps> {
  render() {
    const {
      isSubmitting,
      handleChange,
      onDrop,
      values,
      touched,
      errors,
    } = this.props;

    return (
      <Form>
        <FormGroup
          label="Sigle du cours"
          intent="danger"
          helperText={get(touched, 'class') && get(errors, 'class')}
        >
          <InputGroup
            type="text"
            name="class"
            placeholder="Sigle du cours"
            defaultValue={values.class}
            onChange={handleChange}
            className={classNames({
              [Classes.INTENT_DANGER]:
                get(touched, 'class') && get(errors, 'class'),
            })}
          />
        </FormGroup>
        <FormGroup
          label="Groupe"
          intent="danger"
          helperText={get(touched, 'groupNumber') && get(errors, 'groupNumber')}
        >
          <InputGroup
            type="number"
            name="groupNumber"
            placeholder="Numéro de groupe"
            onChange={handleChange}
            defaultValue={values.groupNumber.toString()}
            className={classNames({
              [Classes.INTENT_DANGER]:
                get(touched, 'groupNumber') && get(errors, 'groupNumber'),
            })}
          />
        </FormGroup>
        <ControlGroup fill>
          <FormGroup label="Session">
            <HTMLSelect
              large
              name="semester"
              options={semestersOptions}
              onChange={handleChange}
              defaultValue={values.semester}
            />
          </FormGroup>
          <FormGroup
            label="Année"
            intent="danger"
            helperText={get(touched, 'year') && get(errors, 'year')}
          >
            <InputGroup
              type="number"
              name="year"
              placeholder="Année"
              defaultValue={values.year.toString()}
              onChange={handleChange}
              className={classNames({
                [Classes.INTENT_DANGER]:
                  get(touched, 'year') && get(errors, 'year'),
              })}
            />
          </FormGroup>
        </ControlGroup>
        <FormGroup label="Importer des étudiants">
          <DragAndDrop
            text="Cliquer ou déposer ici le fichier Excel pour importer une liste d'étudiants"
            onDrop={onDrop}
            formats={['ods', 'xlsx', 'xls']}
          />
        </FormGroup>
        <Button
          type="submit"
          intent="primary"
          large
          icon="add"
          disabled={isSubmitting}
        >
          Ajouter
        </Button>
      </Form>
    );
  }
}

// Setup Formik
export type OnSubmitGroupsAdd = {
  onSubmit(values: Omit<Group, 'id'>, props: FormikProps<Partial<Group>>): void;
};

interface GroupsAddFormikProps extends OnSubmitGroupsAdd, OnDrop {
  initialValues: FormikValues;
}

const AddSchema = Yup.object().shape({
  class: Yup.string().required('Requis'),
  groupNumber: Yup.number().required('Requis'),
  year: Yup.number()
    .min(new Date().getFullYear(), 'Impossible de voyager dans le temps')
    .max(new Date().getFullYear() + 10, 'Future, here I come!')
    .required('Requis'),
});

export const GroupsAddFormik: React.SFC<GroupsAddFormikProps> = (props) => {
  return (
    <Formik
      initialValues={props.initialValues}
      validationSchema={AddSchema}
      onSubmit={props.onSubmit}
      render={(formikProps: FormikProps<Group>) => (
        <GroupsAddForm onDrop={props.onDrop} {...formikProps} />
      )}
    />
  );
};
