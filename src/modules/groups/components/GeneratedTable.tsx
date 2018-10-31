import { HTMLTable } from '@blueprintjs/core';
import * as React from 'react';

interface GeneratedTable {
  object: {};
}

/** Generate HTML Table from javascript object */
export const GeneratedTable: React.SFC<GeneratedTable> = (props) => {
  console.log('0BJ', props.object);
  return (
    <HTMLTable>
      <thead>
        <tr>Hi</tr>
        <tr>Hi</tr>
      </thead>
      <tbody>
        {Object.keys(props.object).map((row: any) => (
          <tr>
            {row.map((data: any) => (
              <td>{data}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </HTMLTable>
  );
};
