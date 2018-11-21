import { Text } from '@blueprintjs/core';
import * as React from 'react';
import styled from 'styled-components';
import { RunnerState } from '..';
import { Loading } from '../../../components/Loading';

type OutputPanelProps = { runner: RunnerState };

const Row = styled.div`
  display: flex;
`;

export const OutputPanel: React.SFC<OutputPanelProps> = (props) => {
  if (props.runner.loading) {
    return <Loading />;
  }
  if (props.runner.error) {
    return <Text>An error occurred</Text>;
  }
  if (!props.runner.codeValidationReport) {
    return <Text>No output</Text>;
  }
  const {
    executionTime,
    exitCode,
    stderr,
    stdout,
    timedOut,
    message,
    result,
  } = props.runner.codeValidationReport;

  return (
    <div>
      <Row>
        <Text>
          Time: {executionTime}
          ms
        </Text>
        <Text>Passed: {result.assertions.passed}</Text>
        <Text>Failed: {result.assertions.failed}</Text>
        <Text>Exit code: {exitCode}</Text>
      </Row>
      <div>
        {result.output.map((testCaseResult) => {
          return testCaseResult.items.map((assertionResult) => <div key={1} />);
        })}
      </div>
      {stderr + stdout + message + timedOut}
    </div>
  );
};
