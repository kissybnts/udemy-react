import * as React from 'react';

const layout: React.SFC = props => (
  <React.Fragment>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main>
      {props.children}
    </main>
  </React.Fragment>
);

export default layout;