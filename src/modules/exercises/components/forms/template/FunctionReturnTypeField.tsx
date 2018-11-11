import { FormGroup, HTMLSelect } from '@blueprintjs/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import {
  Argument,
  Assertion,
  TestCase,
} from '../../../../../__generated__/api';
import { FormValues } from '../../ExercisesAddFormik';
import { typeOptions } from '../../TemplatePanel';

export interface FunctionReturnTypeFieldProps {
  name: string;
}

export const FunctionReturnTypeField: React.SFC<
  FunctionReturnTypeFieldProps
> = (props) => {
  const { name } = props;

  return (
    <Field
      name={name}
      render={({ field, form }: FieldProps) => (
        <FormGroup label="Type de retour de la fonction">
          <HTMLSelect
            options={typeOptions}
            {...field}
            onChange={(e: React.ChangeEvent<any>) => {
              field.onChange(e);

              updateTestCasesReturnType(form, field.value);
            }}
          />
        </FormGroup>
      )}
    />
  );
};

// Maybe an immutable library like emmer would prevent these long functions
const updateTestCasesReturnType = (
  form: FormikProps<FormValues>,
  newValue: SupportedType,
) => {
  form.values.sampleTestCases.forEach((testCase: TestCase, i: number) => {
    testCase.assertions.forEach((assertion: Assertion, j: number) => {
      assertion.inputArguments.forEach((inputArgument: Argument, k: number) => {
        form.setFieldValue(
          `sampleTestCases[${i}].assertions[${j}].inputArguments[${k}]`,
          { ...inputArgument, type: newValue },
        );
      });
    });
  });
};
