/* tslint:disable:no-duplicate-string */

import {
  Button,
  Classes,
  ControlGroup,
  FormGroup,
  H4,
  H5,
  HTMLSelect,
  InputGroup,
  Intent,
  Tab,
  Tabs,
  TextArea,
} from '@blueprintjs/core';
import * as classnames from 'classnames';
import { FieldArray, Form, Formik, FormikProps, FormikValues } from 'formik';
import { get } from 'lodash';
import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as Yup from 'yup';
import { JustifyRight } from '../../../components/styled/JustifyRight';
import {
  Difficulties,
  FunctionReturnTypes,
  SupportedLanguages,
} from '../../../config/enums';
import { generateCodeFromTemplate } from '../../../helpers';
import { Omit } from '../../../types/types';
import { Exercise } from '../models';

export type ExercisesReadProps = {
  onSubmit: (
    values: Omit<Exercise, 'id'>,
    props: FormikProps<Partial<Exercise>>,
  ) => void;
  initialValues: FormikValues;
};

const difficultiesOptions = [
  { label: 'Facile', value: Difficulties.EASY },
  { label: 'Moyen', value: Difficulties.MEDIUM },
  { label: 'Difficile', value: Difficulties.HARD },
];

const typeOptions = [
  { label: 'boolean', value: FunctionReturnTypes.BOOLEAN },
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
  { label: 'object[]', value: FunctionReturnTypes['OBJECT[]'] },
];

const editorOptions = {
  contextmenu: false,
  readOnly: true,
};

const defaultCode = '// generated code will be here';

export class ExercisesAddForm extends React.Component<ExercisesReadProps> {
  state = {
    generatedCode: {
      python: '# generated code will be here',
      java: defaultCode,
      cpp: defaultCode,
      javascript: defaultCode,
    },
  };

  /* tslint:disable:no-big-function */
  render() {
    return (
      <Formik
        validationSchema={Yup.object().shape({
          title: Yup.object().shape({
            en: Yup.string(),
            fr: Yup.string()
              .required('Requis')
              .max(50, 'Trop long!'),
          }),
          description: Yup.object().shape({
            en: Yup.string(),
            fr: Yup.string().required('Requis'),
          }),
          template: Yup.object().shape({
            functionName: Yup.string().required('Requis'),
            className: Yup.string(),
            functionReturnValue: Yup.string().required('Requis'),
            args: Yup.array(
              Yup.object().shape({
                name: Yup.string().required('Requis'),
              }),
            ),
          }),
        })}
        initialValues={this.props.initialValues}
        onSubmit={this.props.onSubmit}
        render={({
          errors,
          touched,
          isSubmitting,
          values,
          handleChange,
        }: FormikProps<Exercise>) => {
          const updateCodePreview = () => {
            this.setState({
              generatedCode: {
                python: generateCodeFromTemplate(
                  values.template,
                  SupportedLanguages.Python,
                ),
                java: generateCodeFromTemplate(
                  values.template,
                  SupportedLanguages.Java,
                ),
                cpp: generateCodeFromTemplate(
                  values.template,
                  SupportedLanguages.Cpp,
                ),
                javascript: generateCodeFromTemplate(
                  values.template,
                  SupportedLanguages.Javascript,
                ),
              },
            });
          };

          return (
            <Form>
              <FormGroup
                label="Titre"
                intent={Intent.DANGER}
                helperText={get(touched, 'title.fr') && get(errors, 'title.fr')}
              >
                <InputGroup
                  name="title.fr"
                  placeholder="Ex.: Sous-chaîne la plus longue sans caractères répétés"
                  onChange={handleChange}
                  className={classnames({
                    [Classes.INTENT_DANGER]:
                      get(touched, 'title.fr') && get(errors, 'title.fr'),
                  })}
                />
              </FormGroup>
              <FormGroup
                label="Description"
                intent={Intent.DANGER}
                helperText={
                  get(touched, 'description.fr') &&
                  get(errors, 'description.fr')
                }
              >
                <TextArea
                  name="description.fr"
                  fill
                  placeholder={`La première ligne du triangle vous sera attribuée sous la forme d'une chaîne et votre tâche sera de renvoyer la couleur finale qui apparaîtra dans la dernière ligne sous la forme d'une chaîne. Dans le cas de l'exemple ci-dessus, vous devez renvoyer le 'G' pour le 'RRGBRGBB' donné.\nLa chaîne de saisie ne contiendra que les lettres majuscules «B», «G» ou «R» et il y aura au moins une lettre pour que vous n'ayez pas à tester une entrée non valide.\nSi vous ne donnez qu'une seule couleur en entrée, retournez cette couleur.`}
                  onChange={handleChange}
                  className={classnames({
                    [Classes.INTENT_DANGER]:
                      get(touched, 'description.fr') &&
                      get(errors, 'description.fr'),
                  })}
                />
              </FormGroup>
              <FormGroup label="Difficulté">
                <HTMLSelect
                  large
                  name="difficulty"
                  options={difficultiesOptions}
                  onChange={handleChange}
                />
              </FormGroup>
              <H5>Template</H5>
              <FormGroup
                label="Nom de la fonction"
                intent={Intent.DANGER}
                helperText={
                  get(touched, 'template.functionName') &&
                  get(errors, 'template.functionName')
                }
              >
                <InputGroup
                  name="template.functionName"
                  placeholder="Ex. : lengthOfLongestSubstring"
                  onBlur={updateCodePreview}
                  onChange={handleChange}
                  className={classnames({
                    [Classes.INTENT_DANGER]:
                      get(touched, 'template.functionName') &&
                      get(errors, 'template.functionName'),
                  })}
                />
              </FormGroup>
              <FormGroup
                labelInfo="(optionnel)"
                label="Nom de la classe"
                helperText="En Java, si le nom de la classe n'est pas spécifié, il prendra la valeur du nom de la fonction"
              >
                <InputGroup
                  name="template.className"
                  placeholder="main"
                  onBlur={updateCodePreview}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup label="Type de retour de la fonction">
                <HTMLSelect
                  defaultValue={values.template.functionReturnType}
                  name="template.functionReturnType"
                  options={typeOptions}
                  onBlur={updateCodePreview}
                  onChange={handleChange}
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
                <TextArea
                  name="template.functionReturnValue"
                  fill
                  placeholder={`Ex. : [1, 43, 54, 3, 109]`}
                  onBlur={updateCodePreview}
                  onChange={handleChange}
                  className={classnames({
                    [Classes.INTENT_DANGER]:
                      get(touched, 'template.functionName') &&
                      get(errors, 'template.functionName'),
                  })}
                />
              </FormGroup>
              <FormGroup label="Paramètres">
                <FieldArray
                  name="template.args"
                  render={(arrayHelpers) => (
                    <div>
                      {values.template &&
                      values.template.args &&
                      values.template.args.length > 0 ? (
                        values.template.args.map((arg, index) => (
                          <div key={index}>
                            <ControlGroup>
                              <InputGroup
                                defaultValue={values.template.args[index].name}
                                name={`template.args.${index}.name`}
                                placeholder={'Ex.: arr'}
                                onBlur={updateCodePreview}
                                onChange={handleChange}
                                className={classnames({
                                  [Classes.INTENT_DANGER]:
                                    get(
                                      touched,
                                      `template.args.${index}.name`,
                                    ) &&
                                    get(errors, `template.args.${index}.name`),
                                })}
                              />
                              <HTMLSelect
                                defaultValue={values.template.args[index].type}
                                name={`template.args.${index}.type`}
                                options={typeOptions}
                                onBlur={updateCodePreview}
                                onChange={handleChange}
                              />
                              <Button
                                type="button"
                                onClick={() => {
                                  arrayHelpers.remove(index);
                                  updateCodePreview();
                                }} // remove a friend from the list
                              >
                                -
                              </Button>
                              {index === values.template.args.length - 1 && (
                                <Button
                                  type="button"
                                  onClick={() =>
                                    arrayHelpers.insert(index, {
                                      type: FunctionReturnTypes.INT,
                                      name: '',
                                    })
                                  } // insert an empty string at a position
                                >
                                  +
                                </Button>
                              )}
                            </ControlGroup>
                          </div>
                        ))
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
                  )}
                />
              </FormGroup>
              <H4>Preview du code</H4>
              <Tabs id="CodePreview" renderActiveTabPanelOnly>
                <Tab
                  id={SupportedLanguages.Javascript}
                  title="Javascript"
                  panel={
                    <MonacoEditor
                      height="300"
                      language="javascript"
                      theme="vs-dark"
                      value={this.state.generatedCode.javascript}
                      options={editorOptions}
                    />
                  }
                />
                <Tab
                  id={SupportedLanguages.Java}
                  title="Java"
                  panel={
                    <MonacoEditor
                      height="300"
                      language="java"
                      theme="vs-dark"
                      value={this.state.generatedCode.java}
                      options={editorOptions}
                    />
                  }
                />
                <Tab
                  id={SupportedLanguages.Cpp}
                  title="C++"
                  panel={
                    <MonacoEditor
                      height="300"
                      language="cpp"
                      theme="vs-dark"
                      value={this.state.generatedCode.cpp}
                      options={editorOptions}
                    />
                  }
                />
                <Tab
                  id={SupportedLanguages.Python}
                  title="Python"
                  panel={
                    <MonacoEditor
                      height="300"
                      language="python"
                      theme="vs-dark"
                      value={this.state.generatedCode.python}
                      options={editorOptions}
                    />
                  }
                />
              </Tabs>
              <JustifyRight>
                <Button type="submit" disabled={isSubmitting}>
                  Ajouter
                </Button>
              </JustifyRight>
            </Form>
          );
        }}
      />
    );
  }
}
