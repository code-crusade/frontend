/* tslint:disable:no-duplicate-string */

import {
  Button,
  Classes,
  ControlGroup,
  FormGroup,
  H5,
  HTMLSelect,
  InputGroup,
  Intent,
  IPanelProps,
  Tab,
  Tabs,
  TextArea,
} from '@blueprintjs/core';
import * as classnames from 'classnames';
import { Field, FieldArray, FieldProps, FormikProps } from 'formik';
import { get } from 'lodash';
import * as React from 'react';
import styled from 'styled-components';
import { JustifyRight } from '../../../components/styled/JustifyRight';
import { FunctionReturnTypes } from '../../../config/enums';
import { Exercise } from '../models';
import { EditorTabs } from './EditorTabs';
import { TestCasesPanel } from './TestCasesPanel';

type TemplatePanelProps = FormikProps<Exercise> & IPanelProps;

export const typeOptions = [
  { key: '1', label: 'boolean', value: FunctionReturnTypes.BOOLEAN },
  { label: 'char', value: FunctionReturnTypes.CHAR },
  { label: 'float', value: FunctionReturnTypes.FLOAT },
  { label: 'int', value: FunctionReturnTypes.INT },
  { label: 'string', value: FunctionReturnTypes.STRING },
  { label: 'object', value: FunctionReturnTypes.OBJECT },
  { label: 'boolean[]', value: FunctionReturnTypes['BOOLEAN[]'] },
  { label: 'char[]', value: FunctionReturnTypes['CHAR[]'] },
  { label: 'float[]', value: FunctionReturnTypes['FLOAT[]'] },
  { label: 'int[]', value: FunctionReturnTypes['INT[]'] },
  { label: 'string[]', value: FunctionReturnTypes['STRING[]'] },
  { label: 'object[]', value: FunctionReturnTypes['OBJECT['] },
];

const Container = styled.div`
  padding: 1em;
`;

export class TemplatePanel extends React.Component<TemplatePanelProps> {
  /* tslint:disable:no-big-function */
  render() {
    const { openPanel, closePanel, ...formikProps } = this.props;
    const { touched, errors } = formikProps;

    return (
      <Container>
        <FormGroup
          label="Nom de la fonction"
          intent={Intent.DANGER}
          helperText={
            get(touched, 'template.functionName') &&
            get(errors, 'template.functionName')
          }
        >
          <Field
            name="template.functionName"
            render={({ field }: FieldProps) => (
              <InputGroup
                placeholder="Ex. : lengthOfLongestSubstring"
                className={classnames({
                  [Classes.INTENT_DANGER]:
                    get(touched, 'template.functionName') &&
                    get(errors, 'template.functionName'),
                })}
                {...field}
              />
            )}
          />
        </FormGroup>
        <FormGroup
          labelInfo="(optionnel)"
          label="Nom de la classe"
          helperText="En Java, si le nom de la classe n'est pas spécifié, il prendra la valeur du nom de la fonction"
        >
          <Field
            name="template.className"
            render={({ field }: FieldProps) => (
              <InputGroup placeholder="main" {...field} />
            )}
          />
        </FormGroup>
        <FormGroup label="Type de retour de la fonction">
          <Field
            name="template.functionReturnType"
            render={({ field }: FieldProps) => (
              <HTMLSelect options={typeOptions} {...field} />
            )}
          />
        </FormGroup>
        <FormGroup
          label="Valeur de retour de la fonction"
          intent={Intent.DANGER}
          helperText={
            get(touched, 'template.functionName') &&
            get(errors, 'template.functionName')
          }
        >
          <Field
            name="template.functionReturnValue"
            render={({ field }: FieldProps) => (
              <TextArea
                fill
                placeholder={`Ex. : [1, 43, 54, 3, 109]`}
                className={classnames({
                  [Classes.INTENT_DANGER]:
                    get(touched, 'template.functionName') &&
                    get(errors, 'template.functionName'),
                })}
                {...field}
              />
            )}
          />
        </FormGroup>
        <FormGroup label="Paramètres">
          <FieldArray
            name="template.args"
            render={(arrayHelpers) => {
              console.log('Rendering the field array', arrayHelpers);
              return (
                <div>
                  {arrayHelpers.form.values.template &&
                  arrayHelpers.form.values.template.args &&
                  arrayHelpers.form.values.template.args.length > 0 ? (
                    arrayHelpers.form.values.template.args.map(
                      (
                        arg: { type: FunctionReturnTypes; name: string },
                        index: number,
                      ) => (
                        <ControlGroup key={index}>
                          <Field
                            name={`template.args.${index}.name`}
                            render={({ field }: FieldProps) => (
                              <InputGroup
                                placeholder={'Ex.: arr'}
                                className={classnames({
                                  [Classes.INTENT_DANGER]:
                                    get(
                                      touched,
                                      `template.args.${index}.name`,
                                    ) &&
                                    get(errors, `template.args.${index}.name`),
                                })}
                                {...field}
                              />
                            )}
                          />
                          <Field
                            name={`template.args.${index}.type`}
                            render={({ field }: FieldProps) => (
                              <HTMLSelect options={typeOptions} {...field} />
                            )}
                          />
                          <Button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            -
                          </Button>
                          <Button
                            type="button"
                            onClick={() =>
                              arrayHelpers.insert(index, {
                                type: FunctionReturnTypes.INT,
                                name: '',
                              })
                            }
                          >
                            +
                          </Button>
                        </ControlGroup>
                      ),
                    )
                  ) : (
                    <Button
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          type: FunctionReturnTypes.INT,
                          name: '',
                        })
                      }
                    >
                      {/* show this when user has removed all friends from the list */}
                      Ajouter nouveau paramètre
                    </Button>
                  )}
                </div>
              );
            }}
          />
        </FormGroup>
        <H5>Code additionnel</H5>
        <Tabs id={1} renderActiveTabPanelOnly>
          <Tab
            id={'prependedCode'}
            title={"Code avant point d'entrée"}
            panel={
              <EditorTabs
                name="template.prependedCode"
                editorOptions={{ automaticLayout: true }}
              />
            }
          />
          <Tab
            id={'appendedCode'}
            title={"Code après point d'entrée"}
            panel={
              <EditorTabs
                name="template.appendedCode"
                editorOptions={{ automaticLayout: true }}
              />
            }
          />
        </Tabs>

        <JustifyRight>
          <Button onClick={this.openTestCasesPanel}>Suivant</Button>
        </JustifyRight>
      </Container>
    );
  }

  private openTestCasesPanel = () => {
    const { openPanel, closePanel, ...formikProps } = this.props;

    this.props.openPanel({
      component: TestCasesPanel,
      props: formikProps,
      title: "Cas d'essai",
    });
  };
}
