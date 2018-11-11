import { FormGroup, Intent, TextArea } from '@blueprintjs/core';
import * as Classes from '@blueprintjs/core/lib/esm/common/classes';
import * as classnames from 'classnames';
import { Field, FieldProps } from 'formik';
import { get } from 'lodash';
import * as React from 'react';

export interface FunctionReturnValueFieldProps {
  name: string;
}

export const FunctionReturnValueField: React.SFC<
  FunctionReturnValueFieldProps
> = (props) => {
  const { name } = props;

  return (
    <Field
      name={name}
      render={({ field, form: { touched, errors } }: FieldProps) => (
        <FormGroup
          label="Valeur de retour de la fonction"
          intent={Intent.DANGER}
          helperText={get(touched, name) && get(errors, name)}
        >
          <TextArea
            fill
            placeholder={`Ex. : [1, 43, 54, 3, 109]`}
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
