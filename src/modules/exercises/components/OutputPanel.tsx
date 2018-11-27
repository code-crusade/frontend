import { Callout, Card, Colors, Icon, Intent, Text } from '@blueprintjs/core';
import * as React from 'react';
import styled from 'styled-components';
import { RunnerState } from '..';
import { Loading } from '../../../components/Loading';

type OutputPanelProps = { runner: RunnerState };

const Row = styled.div`
  display: flex;
  margin-bottom: 1em;
  flex-wrap: wrap;
`;

const MarginLeft = styled.div`
  margin-left: 2em;
  margin-bottom: 1em;
`;

const MarginLeftWithFlex = styled(MarginLeft)`
  display: flex;
`;

const StyledIcon = styled(Icon)`
  margin-right: 0.5em;
`;

const ColoredText = styled(Text)`
  color: ${(props: { color?: string }) => props.color || 'inherit'};
`;

const MarginBottomText = styled(ColoredText)`
  margin-bottom: 1em;
`;

const SpacedText = styled(ColoredText)`
  margin-right: 2em;
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
    result,
  } = props.runner.codeValidationReport;

  return (
    <Card>
      <Row>
        <SpacedText>
          Time: {executionTime}
          ms
        </SpacedText>
        <SpacedText
          color={result.assertions.passed ? Colors.GREEN3 : undefined}
        >
          Passed: {result.assertions.passed}
        </SpacedText>
        <SpacedText color={result.assertions.failed ? Colors.RED3 : undefined}>
          Failed: {result.assertions.failed}
        </SpacedText>
        <SpacedText color={exitCode ? Colors.RED3 : Colors.GREEN3}>
          Exit code: {exitCode}
        </SpacedText>
      </Row>
      <div>
        {result.output.map((testCaseResult, i) => (
          <div key={i}>
            <MarginBottomText
              color={testCaseResult.passed ? Colors.GREEN3 : Colors.RED3}
            >
              <code>{`█ ${testCaseResult.text}`}</code>
            </MarginBottomText>
            {testCaseResult.items.map((assertionResult, j) => (
              <MarginLeft key={j}>
                <MarginBottomText
                  color={assertionResult.passed ? Colors.GREEN3 : Colors.RED3}
                >
                  <code>{`█ ${assertionResult.text}`}</code>
                </MarginBottomText>
                {assertionResult.items.map((assertion, k) => (
                  <MarginLeftWithFlex key={k}>
                    {
                      <StyledIcon
                        color={assertion.passed ? Colors.GREEN3 : Colors.RED3}
                        icon={assertion.passed ? 'small-tick' : 'issue'}
                      />
                    }
                    <ColoredText
                      color={assertion.passed ? Colors.GREEN3 : Colors.RED3}
                    >
                      <code>{assertion.message}</code>
                    </ColoredText>
                  </MarginLeftWithFlex>
                ))}
              </MarginLeft>
            ))}
          </div>
        ))}
      </div>
      {stderr && (
        <Callout intent={Intent.DANGER} title={'stderr'}>
          <ColoredText color={Colors.RED3}>
            <code>{stderr}</code>
          </ColoredText>
        </Callout>
      )}
    </Card>
  );
};
