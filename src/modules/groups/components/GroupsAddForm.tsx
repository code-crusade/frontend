import {
  Button,
  Classes,
  ControlGroup,
  FormGroup,
  HTMLSelect,
  InputGroup,
} from '@blueprintjs/core';
import * as classNames from 'classnames';
import { Form, Formik, FormikProps } from 'formik';
import { get } from 'lodash';
import * as React from 'react';
import { Omit } from 'react-redux';
import { DragAndDrop } from 'src/modules/groups/components/DragAndDrop';
import * as Yup from 'yup';
import { Group, Semesters } from '../../../__generated__/api';
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
            name="course"
            placeholder="Sigle du cours"
            defaultValue={values.course}
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
  onSubmit(values: FormValues, props: FormikProps<FormValues>): void;
};

export type FormValues = Omit<Group, 'id'>;

interface GroupsAddFormikProps extends OnSubmitGroupsAdd, OnDrop {
  initialValues: FormValues;
}

const AddSchema = Yup.object().shape({
  course: Yup.string().required('Requis'),
  groupNumber: Yup.number().required('Requis'),
  year: Yup.number()
    .min(new Date().getFullYear(), 'Impossible de voyager dans le temps')
    .max(new Date().getFullYear() + 10, 'Future, here I come!')
    .required('Requis'),
});

export const GroupsAddFormik: React.FunctionComponent<GroupsAddFormikProps> = (
  props,
) => {
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
