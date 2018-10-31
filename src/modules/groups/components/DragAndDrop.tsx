import { Tag } from '@blueprintjs/core';
import * as React from 'react';
import DropZone, { DropzoneProps } from 'react-dropzone';
import styled from 'styled-components';

const StyledDropZone = styled(DropZone)`
  border: 2px dashed #394b59;
  min-height: 50px;
  padding: 20px;
  border-radius: 5px;
`;

const Centered = styled.p`
  text-align: center;
`;

const activeStyle = {
  border: '2px solid #53ae42',
};

interface DragAndDrop extends DropzoneProps {
  text: string;
  formats: string[];
}

export const DragAndDrop: React.SFC<DragAndDrop> = (props) => {
  return (
    <StyledDropZone activeStyle={activeStyle} {...props}>
      <Centered>{props.text}</Centered>
      <Centered>
        {props.formats &&
          props.formats.map((format, i) => (
            <Tag large intent="success" key={i}>
              .{format}
            </Tag>
          ))}
      </Centered>
      {props.children}
    </StyledDropZone>
  );
};
