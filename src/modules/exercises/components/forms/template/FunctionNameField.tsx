import { Classes, FormGroup, InputGroup, Intent } from '@blueprintjs/core';
import * as classnames from 'classnames';
import { Field, FieldProps } from 'formik';
import { get } from 'lodash';
import * as React from 'react';

export interface FunctionNameFieldProps {
  name: string;
}

export const FunctionNameField: React.SFC<FunctionNameFieldProps> = (props) => {
  const { name } = props;

  return (
    <Field
      name={name}
      render={({ field, form: { touched, errors } }: FieldProps) => (
        <FormGroup
          label="Nom de la fonction"
          intent={Intent.DANGER}
          helperText={get(touched, name) && get(errors, name)}
        >
          <InputGroup
            placeholder="Ex. : lengthOfLongestSubstring"
            className={classnames({
              [Classes.INTENT_DANGER]: get(touched, name) && get(errors, name),
            })}
            {...field}
          />
        </FormGroup>
      )}
    />
  );
};
