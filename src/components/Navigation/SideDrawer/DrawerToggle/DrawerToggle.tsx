import * as React from 'react';
import * as cssClasses from './DrawerToggle.css';

interface Props {
  clicked: () => void;
}

const drawerToggle: React.SFC<Props> = props => (
  <div className={cssClasses.DrawerToggle} onClick={props.clicked}>
    <div/>
    <div/>
    <div/>
  </div>
);

export default drawerToggle;