import * as React from 'react';

interface Props {
  userName: string;
}

const userOutput = (props: Props) => {
  return (
    <div>
      <p>{props.userName}</p>
      <p>this is a user name you inputted.</p>
    </div>
  );
};

export default userOutput;