import {
  Button,
  ControlGroup,
  FormGroup,
  H5,
  InputGroup,
  Intent,
} from '@blueprintjs/core';
import * as Classes from '@blueprintjs/core/lib/esm/common/classes';
import { IconNames } from '@blueprintjs/icons';
import * as classnames from 'classnames';
import { Field, FieldArray, FieldProps } from 'formik';
import { get } from 'lodash';
import * as React from 'react';
import { JustifyRightMargin } from '../../../../components/styled/JustifyRightMargin';
import { FunctionReturnTypes } from '../../../../config/enums';
import { TestCase } from '../../models';
import { AssertionsField } from './AssertionsField';

export interface TestCasesFieldProps {
  name: string;
}

export const TestCasesField: React.SFC<TestCasesFieldProps> = (props) => {
  const { name } = props;

  return (
    <FieldArray
      name={name}
      render={({ form, insert: insertTestCase, remove: removeTestCase }) => (
        <div>
          {form.values.sampleTestCases.map((testCase: TestCase, i: number) => (
            <div key={i}>
              <H5>{`Cas de test #${i + 1}`}</H5>
              <Field
                name={`${name}.${i}.it`}
                render={({ field, form: { touched, errors } }: FieldProps) => (
                  <FormGroup
                    label="It"
                    intent={Intent.DANGER}
                    helperText={
                      get(touched, 'template.functionName') &&
                      get(errors, 'template.functionName')
                    }
                  >
                    <InputGroup
                      placeholder={'saysHello'}
                      className={classnames({
                        [Classes.INTENT_DANGER]:
                          get(touched, `sampleTestCases.${i}.it`) &&
                          get(errors, `sampleTestCases.${i}.it`),
                      })}
                      {...field}
                    />
                  </FormGroup>
                )}
              />
              <AssertionsField
                testCase={testCase}
                name={`${name}.${i}.assertions`}
              />
              <JustifyRightMargin>
                <ControlGroup>
                  {form.values.sampleTestCases.length > 1 && (
                    <Button
                      minimal
                      type="button"
                      onClick={() => removeTestCase(i)}
                      icon={IconNames.CROSS}
                    />
                  )}
                  <Button
                    minimal
                    type="button"
                    onClick={() =>
                      insertTestCase(i + 1, {
                        it: '',
                        assertions: [
                          {
                            inputArguments: form.values.template.params.map(
                              (param: {
                                type: FunctionReturnTypes;
                                value: any;
                              }) => ({
                                type: param.type,
                                value: '',
                              }),
                            ),
                            expectedOutput: {
                              type: form.values.template.functionReturnType,
                              value: '',
                            },
                          },
                        ],
                      })
                    }
                    icon={IconNames.PLUS}
                  />
                </ControlGroup>
              </JustifyRightMargin>
            </div>
          ))}
        </div>
      )}
    />
  );
};
