import * as React from 'react';
import * as styles from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout: React.SFC = props => (
  <React.Fragment>
    <Toolbar />
    <SideDrawer />
    <main className={styles.Content}>
      {props.children}
    </main>
  </React.Fragment>
);

export default layout;