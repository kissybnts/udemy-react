import * as React from 'react';
import * as styles from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout: React.SFC = props => (
  <React.Fragment>
    <Toolbar />
    <main className={styles.Content}>
      {props.children}
    </main>
  </React.Fragment>
);

export default layout;