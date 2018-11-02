import { Tab, Tabs } from '@blueprintjs/core';
import { Field, FieldProps } from 'formik';
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
  languageMap?: { [lang in SupportedLanguages]: string };
  name?: string;
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
            {props.languageMap ? (
              <MonacoEditor
                height="300"
                language={lang}
                theme="vs-dark"
                options={props.editorOptions}
                value={props.languageMap[lang]}
              />
            ) : (
              <Field
                name={`${props.name}.${lang}`}
                render={({
                  field: { onChange, ...rest },
                  form,
                }: FieldProps) => (
                  <MonacoEditor
                    height="300"
                    language={lang}
                    theme="vs-dark"
                    options={props.editorOptions}
                    onChange={debounce((value) => {
                      form.setFieldValue(`${props.name}.${lang}`, value);
                    }, 100)}
                    {...rest}
                  />
                )}
              />
            )}
          </PanelContainer>
        }
      />
    ))}
  </Tabs>
);
