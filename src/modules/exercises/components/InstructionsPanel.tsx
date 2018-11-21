/* tslint:disable:no-duplicate-string */

import { H3 } from '@blueprintjs/core';
import * as React from 'react';
import { Exercise } from '../../../__generated__/api';

type InstructionsPanelProps = { exercise: Exercise };

export const InstructionsPanel: React.SFC<InstructionsPanelProps> = (props) => {
  return <H3>{props.exercise.description.fr}</H3>;
};
