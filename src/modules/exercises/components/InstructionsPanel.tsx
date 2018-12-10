import * as React from 'react';
// @ts-ignore
import * as ReactMarkdown from 'react-markdown/with-html';
import { Exercise } from '../../../__generated__/api';

type InstructionsPanelProps = { exercise: Exercise };

export const InstructionsPanel: React.FunctionComponent<
  InstructionsPanelProps
> = (props) => {
  return (
    <ReactMarkdown escapeHtml={false} source={props.exercise.description.fr} />
  );
};
