import * as React from 'react';

interface Props {
  clicked: () => void;
}

const drawerToggle: React.SFC<Props> = props => (
  <div onClick={props.clicked}>MENU</div>
);

export default drawerToggle;