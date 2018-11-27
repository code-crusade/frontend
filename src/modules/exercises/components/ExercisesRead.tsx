import {
  Button,
  FormGroup,
  H1,
  H3,
  HTMLSelect,
  Tab,
  Tabs,
} from '@blueprintjs/core';
import * as React from 'react';
import MonacoEditor, {
  ChangeHandler,
  EditorDidMount,
} from 'react-monaco-editor';
import styled from 'styled-components';
import { RunnerState } from '..';
import { SupportedLanguages } from '../../../__generated__/api';
import { Err404 } from '../../../components/Err404';
import { Loading } from '../../../components/Loading';
import { JustifyRightMargin } from '../../../components/styled';
import { WithExerciseInjectedProps } from '../hocs/withExercise';
import { InstructionsPanel } from './InstructionsPanel';
import { OutputPanel } from './OutputPanel';

export type EditorProps = {
  editorCode: string;
  editorDidMount: EditorDidMount;
  editorOptions: object;
  editorOnChange: ChangeHandler;
  onSubmit: () => void;
  onValidateClick: () => void;
  selectedLanguage: SupportedLanguages;
  onLanguageChange: React.ChangeEventHandler<HTMLSelectElement>;
  runner: RunnerState;
  sampleTestsCode: string;
};

const Container = styled.div`
  display: grid;
  grid-row: 2 / end;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto 1fr auto 1fr;
  width: 99%;
`;

const EditorContainer = styled.div`
  grid-column: 2 / end;
  grid-row: 2 / 3;
  max-width: 99%;
  padding-bottom: 2em;
`;

const SampleTestsContainer = styled.div`
  grid-column: 2 / end;
  grid-row: 4 / 5;
  max-width: 99%;
  padding-bottom: 2em;
`;

const ExerciseContainer = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / end;
  padding: 1em;
`;

const StyledButton = styled(Button)`
  margin-top: 2em;
  margin-left: 1em;
`;

const StyledFormGroup = styled(FormGroup)`
  margin-top: 2em;
  margin-bottom: 0;
`;

const Row1 = styled.div`
  grid-column: 2 / end;
  grid-row: 1 / 2;
`;

const Row3 = styled.div`
  grid-column: 2 / end;
  grid-row: 3 / 4;
`;

const languagesOptions = [
  { label: 'C++', value: SupportedLanguages.Cpp },
  { label: 'Java', value: SupportedLanguages.Java },
  { label: 'Javascript', value: SupportedLanguages.Javascript },
  { label: 'Python', value: SupportedLanguages.Python },
];

enum TabsIds {
  INSTRUCTIONS,
  OUTPUT,
}

type ExercisesReadProps = EditorProps & WithExerciseInjectedProps;

type ExercisesReadState = {
  currentTab: TabsIds;
};

export class ExercisesRead extends React.Component<
  ExercisesReadProps,
  ExercisesReadState
> {
  state = {
    currentTab: TabsIds.INSTRUCTIONS,
  };

  render() {
    if (this.props.loading) {
      return <Loading />;
    }
    if (this.props.error || !this.props.exercise) {
      return <Err404 />;
    }
    return (
      <Container>
        <ExerciseContainer>
          <H1>{this.props.exercise.title.fr}</H1>
          <Tabs
            onChange={this.handleTabChange}
            selectedTabId={this.state.currentTab}
            id="ExercisesReadTabs"
          >
            <Tab
              id={TabsIds.INSTRUCTIONS}
              title="Instructions"
              panel={<InstructionsPanel exercise={this.props.exercise} />}
            />
            <Tab
              id={TabsIds.OUTPUT}
              title="Sortie"
              panel={<OutputPanel runner={this.props.runner} />}
            />
          </Tabs>
          <JustifyRightMargin>
            <StyledFormGroup label="Langage" inline>
              <HTMLSelect
                options={languagesOptions}
                value={this.props.selectedLanguage}
                onChange={this.props.onLanguageChange}
              />
            </StyledFormGroup>
            <StyledButton onClick={this.handleValidateClick}>
              Valider tests
            </StyledButton>
            <StyledButton onClick={this.handleSubmit}>Soumettre</StyledButton>
          </JustifyRightMargin>
        </ExerciseContainer>
        <Row1>
          <H3>Solution</H3>
        </Row1>
        <EditorContainer>
          <MonacoEditor
            language={this.props.selectedLanguage}
            theme="vs-dark"
            value={this.props.editorCode}
            options={this.props.editorOptions}
            onChange={this.props.editorOnChange}
            editorDidMount={this.props.editorDidMount}
          />
        </EditorContainer>
        <Row3>
          <H3>Cas de tests d'example</H3>
        </Row3>
        <SampleTestsContainer>
          <MonacoEditor
            height={300}
            language={this.props.selectedLanguage}
            theme="vs-dark"
            options={{ ...this.props.editorOptions, readOnly: true }}
            value={this.props.sampleTestsCode}
          />
        </SampleTestsContainer>
      </Container>
    );
  }

  private handleValidateClick = () => {
    this.setState({ currentTab: TabsIds.OUTPUT });
    this.props.onValidateClick();
  };

  private handleSubmit = () => {
    this.setState({ currentTab: TabsIds.OUTPUT });
    this.props.onSubmit();
  };

  private handleTabChange = (id: TabsIds) => {
    this.setState({ currentTab: id });
  };
}
