import {
  Button,
  ControlGroup,
  FormGroup,
  InputGroup,
  Tag,
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { Field, FieldArray, FieldProps } from 'formik';
import * as React from 'react';
import styled from 'styled-components';
import { Argument, Assertion, TestCase } from '../../../../__generated__/api';
import { JustifyRight } from '../../../../components/styled';
import { FormValues } from '../ExercisesAddFormik';

const Compact = styled.div`
  .bp3-form-group {
    margin: 0 0 4px;
  }
`;

export interface AssertionsFieldProps {
  testCase: TestCase;
  name: string;
}

export const AssertionsField: React.SFC<AssertionsFieldProps> = (props) => {
  const { testCase, name } = props;

  return (
    <FieldArray
      name={name}
      render={({ insert, remove, form: { values } }) => {
        console.log(values, name);
        const newAssertion = {
          inputArguments: values.template.params.map(
            (param: { type: SupportedType; value: any }) => ({
              type: param.type,
              value: '',
            }),
          ),
          expectedOutput: {
            type: values.template.functionReturnType,
            value: '',
          },
        };

        return (
          <div>
            {testCase.assertions.map((assertion: Assertion, i: number) => (
              <Compact key={i}>
                <FormGroup inline label={`Assertion #${i + 1}`}>
                  <FormGroup label={'IN :'}>
                    <ControlGroup vertical>
                      {assertion.inputArguments.map(
                        (inputArgument: Argument, j: number) => (
                          <Field
                            key={j}
                            name={`${name}.${i}.inputArguments.${j}.value`}
                            render={({ field }: FieldProps<FormValues>) => (
                              <InputGroup
                                small
                                rightElement={
                                  <Tag minimal>
                                    {`${values.template.params[j].name}: ${
                                      inputArgument.type
                                    }`}
                                  </Tag>
                                }
                                {...field}
                              />
                            )}
                          />
                        ),
                      )}
                    </ControlGroup>
                  </FormGroup>
                  <FormGroup label={'OUT : '}>
                    {
                      <Field
                        name={`${name}.${i}.expectedOutput.value`}
                        render={({ field }: FieldProps<FormValues>) => (
                          <InputGroup
                            small
                            rightElement={
                              <Tag minimal={true}>
                                {values.template.functionReturnType}
                              </Tag>
                            }
                            {...field}
                          />
                        )}
                      />
                    }
                  </FormGroup>

                  <JustifyRight>
                    {testCase.assertions.length > 1 && (
                      <Button
                        minimal
                        type="button"
                        onClick={() => remove(i)}
                        icon={IconNames.CROSS}
                      />
                    )}
                    <Button
                      minimal
                      type="button"
                      onClick={() => insert(i + 1, newAssertion)}
                      icon={IconNames.PLUS}
                    />
                  </JustifyRight>
                </FormGroup>
              </Compact>
            ))}
          </div>
        );
      }}
    />
  );
};
