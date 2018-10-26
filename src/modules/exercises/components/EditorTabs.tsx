import { Tab, Tabs } from '@blueprintjs/core';
import { debounce } from 'lodash';
import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';
import styled from 'styled-components';
import { SupportedLanguages } from '../../../config/enums';

const PanelContainer = styled.div`
  margin-bottom: 2em;
`;

const tabTitles = {
  [SupportedLanguages.Cpp]: 'C++',
  [SupportedLanguages.Java]: 'Java',
  [SupportedLanguages.Javascript]: 'Javascript',
  [SupportedLanguages.Python]: 'Python',
};

type EditorTabsProps = {
  editorOptions?: object;
  rootObject: object;
  onChange?: (value: string, lang: SupportedLanguages) => void;
};

export const EditorTabs: React.SFC<EditorTabsProps> = (props) => (
  <Tabs id="CodePreview" renderActiveTabPanelOnly>
    {Object.values(SupportedLanguages).map((lang) => (
      <Tab
        key={lang}
        id={lang}
        title={tabTitles[lang]}
        panel={
          <PanelContainer>
            <MonacoEditor
              height="300"
              language={lang}
              theme="vs-dark"
              value={props.rootObject[lang]}
              options={props.editorOptions}
              onChange={debounce((value) => {
                if (props.onChange) {
                  props.onChange(value, lang);
                }
              }, 100)}
            />
          </PanelContainer>
        }
      />
    ))}
  </Tabs>
);
