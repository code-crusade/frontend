import { FormGroup, InputGroup } from '@blueprintjs/core';
import { Field, FieldProps } from 'formik';
import * as React from 'react';

export interface ClassNameFieldProps {
  name: string;
}

export const ClassNameField: React.SFC<ClassNameFieldProps> = (props) => {
  const { name } = props;

  return (
    <Field
      name={name}
      render={({ field }: FieldProps) => (
        <FormGroup
          labelInfo="(optionnel)"
          label="Nom de la classe"
          helperText="En Java, si le nom de la classe n'est pas spécifié, il prendra la valeur du nom de la fonction"
        >
          <InputGroup placeholder="main" {...field} />
        </FormGroup>
      )}
    />
  );
};
