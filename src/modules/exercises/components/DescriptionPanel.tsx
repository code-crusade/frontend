/* tslint:disable:no-duplicate-string */

import {
  Button,
  Classes,
  FormGroup,
  HTMLSelect,
  InputGroup,
  Intent,
  IPanelProps,
  TextArea,
} from '@blueprintjs/core';
import * as classnames from 'classnames';
import { Field, FieldProps, FormikProps } from 'formik';
import { get } from 'lodash';
import * as React from 'react';
import styled from 'styled-components';
import { JustifyRightMargin } from '../../../components/styled';
import { Difficulties } from '../../../config/enums';
import { Exercise } from '../models';
import { TemplatePanel } from './TemplatePanel';

const difficultiesOptions = [
  { label: 'Facile', value: Difficulties.EASY },
  { label: 'Moyen', value: Difficulties.MEDIUM },
  { label: 'Difficile', value: Difficulties.HARD },
];

type DescriptionPanelProps = FormikProps<Exercise> & IPanelProps;

const Container = styled.div`
  padding: 1em;
`;

const StyledTextArea = styled(TextArea)`
  min-height: 300px;
`;

export class DescriptionPanel extends React.Component<DescriptionPanelProps> {
  render() {
    return (
      <Container>
        <Field name="title.fr">
          {({ field, form: { touched, errors } }: FieldProps) => (
            <FormGroup
              label="Titre"
              intent={Intent.DANGER}
              helperText={get(touched, 'title.fr') && get(errors, 'title.fr')}
            >
              <InputGroup
                placeholder="Ex.: Sous-chaîne la plus longue sans caractères répétés"
                className={classnames({
                  [Classes.INTENT_DANGER]:
                    get(touched, 'title.fr') && get(errors, 'title.fr'),
                })}
                {...field}
              />
            </FormGroup>
          )}
        </Field>

        <Field name="description.fr">
          {({ field, form: { touched, errors } }: FieldProps) => (
            <FormGroup
              label="Description"
              intent={Intent.DANGER}
              helperText={
                get(touched, 'description.fr') && get(errors, 'description.fr')
              }
            >
              <StyledTextArea
                fill
                placeholder={`La première ligne du triangle vous sera attribuée sous la forme d'une chaîne et votre tâche sera de renvoyer la couleur finale qui apparaîtra dans la dernière ligne sous la forme d'une chaîne. Dans le cas de l'exemple ci-dessus, vous devez renvoyer le 'G' pour le 'RRGBRGBB' donné.\n\nLa chaîne de saisie ne contiendra que les lettres majuscules «B», «G» ou «R» et il y aura au moins une lettre pour que vous n'ayez pas à tester une entrée non valide.\n\nSi vous ne donnez qu'une seule couleur en entrée, retournez cette couleur.`}
                className={classnames({
                  [Classes.INTENT_DANGER]:
                    get(touched, 'description.fr') &&
                    get(errors, 'description.fr'),
                })}
                {...field}
              />
            </FormGroup>
          )}
        </Field>

        <FormGroup label="Difficulté">
          <Field name="difficulty">
            {({ field }: FieldProps) => (
              <HTMLSelect large options={difficultiesOptions} {...field} />
            )}
          </Field>
        </FormGroup>

        <JustifyRightMargin>
          <Field
            render={({ form }: FieldProps) => (
              <Button
                disabled={Boolean(
                  !form.dirty || form.errors.description || form.errors.title,
                )}
                onClick={this.openTemplatePanel}
              >
                Suivant
              </Button>
            )}
          />
        </JustifyRightMargin>
      </Container>
    );
  }

  private openTemplatePanel = () => {
    this.props.openPanel({
      component: TemplatePanel,
      title: "Point d'entrée",
    });
  };
}
