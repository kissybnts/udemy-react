import { ChangeEvent } from 'react';
import * as React from 'react';

interface Props {
  change: (event: ChangeEvent<HTMLInputElement>) => void;
  userName: string;
}

const userInput = (props: Props) => {
  return (
    <div>
      <input value={props.userName} onChange={props.change}/>
    </div>
  );
};

export default userInput;