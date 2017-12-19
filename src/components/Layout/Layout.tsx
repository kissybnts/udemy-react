import * as React from 'react';
import * as styles from './Layout.css';

const layout: React.SFC = props => (
  <React.Fragment>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={styles.Content}>
      {props.children}
    </main>
  </React.Fragment>
);

export default layout;