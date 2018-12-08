import {
  Button,
  ControlGroup,
  FormGroup,
  HTMLSelect,
  InputGroup,
} from '@blueprintjs/core';
import * as Classes from '@blueprintjs/core/lib/esm/common/classes';
import * as classnames from 'classnames';
import { Field, FieldArray, FieldProps, FormikProps } from 'formik';
import { get } from 'lodash';
import * as React from 'react';
import {
  Assertion,
  SupportedType,
  TestCase,
} from '../../../../../__generated__/api';
import { FormValues } from '../../ExercisesAddFormik';
import { typeOptions } from '../../TemplatePanel';

export interface ParametersFieldProps {
  name: string;
}

export const ParametersField: React.SFC<ParametersFieldProps> = (props) => {
  const { name } = props;

  return (
    <FormGroup label="Paramètres">
      <FieldArray
        name={name}
        render={(arrayHelpers) => {
          return (
            <div>
              {arrayHelpers.form.values.template.params.map(
                (arg: { type: SupportedType; name: string }, index: number) => (
                  <ControlGroup key={index}>
                    <Field
                      name={`${name}.${index}.name`}
                      render={({
                        field,
                        form: { touched, errors },
                      }: FieldProps) => (
                        <InputGroup
                          placeholder={'Ex.: arr'}
                          className={classnames({
                            [Classes.INTENT_DANGER]:
                              get(touched, `${name}.${index}.name`) &&
                              get(errors, `${name}.${index}.name`),
                          })}
                          {...field}
                        />
                      )}
                    />
                    <Field
                      name={`${name}.${index}.type`}
                      render={({ field, form }: FieldProps) => (
                        <HTMLSelect
                          options={typeOptions}
                          {...field}
                          onChange={(e: React.ChangeEvent<any>) => {
                            field.onChange(e);

                            updateTestCasesArgType(form, e.target.value, index);
                          }}
                        />
                      )}
                    />
                    {arrayHelpers.form.values.template.params.length !== 1 && (
                      <Button
                        type="button"
                        onClick={() => {
                          arrayHelpers.remove(index);

                          removeArgumentFromTestCases(arrayHelpers.form, index);
                        }}
                      >
                        -
                      </Button>
                    )}
                    <Button
                      type="button"
                      onClick={() => {
                        arrayHelpers.insert(index + 1, {
                          type: SupportedType.INT,
                          name: '',
                        });

                        insertArgumentInTestCases(arrayHelpers.form, index + 1);
                      }}
                    >
                      +
                    </Button>
                  </ControlGroup>
                ),
              )}
            </div>
          );
        }}
      />
    </FormGroup>
  );
};

// Usage of an immutable library like emmer would prevent these long update functions
const insertArgumentInTestCases = (
  form: FormikProps<FormValues>,
  insertionIndex: number,
) => {
  form.values.sampleTestCases.forEach((testCase: TestCase, i: number) => {
    testCase.assertions.forEach((assertion: Assertion, j: number) => {
      assertion.inputArguments.forEach(() => {
        const array =
          form.values.sampleTestCases[i].assertions[j].inputArguments;
        form.setFieldValue(
          `sampleTestCases[${i}].assertions[${j}].inputArguments`,
          [
            ...array.slice(0, insertionIndex),
            {
              type: SupportedType.INT,
              value: '',
            },
            ...array.slice(insertionIndex),
          ],
        );
      });
    });
  });
};

const removeArgumentFromTestCases = (
  form: FormikProps<FormValues>,
  deletionIndex: number,
) => {
  form.values.sampleTestCases.forEach((testCase: TestCase, i: number) => {
    testCase.assertions.forEach((assertion: Assertion, j: number) => {
      assertion.inputArguments.forEach(() => {
        const array =
          form.values.sampleTestCases[i].assertions[j].inputArguments;
        form.setFieldValue(
          `sampleTestCases[${i}].assertions[${j}].inputArguments`,
          [...array.slice(0, deletionIndex), ...array.slice(deletionIndex + 1)],
        );
      });
    });
  });
};

const updateTestCasesArgType = (
  form: FormikProps<FormValues>,
  newValue: SupportedType,
  updateIndex: number,
) => {
  form.values.sampleTestCases.forEach((testCase: TestCase, i: number) => {
    testCase.assertions.forEach((assertion: Assertion, j: number) => {
      form.setFieldValue(
        `sampleTestCases[${i}].assertions[${j}].inputArguments[${updateIndex}].type`,
        newValue,
      );
    });
  });
};
