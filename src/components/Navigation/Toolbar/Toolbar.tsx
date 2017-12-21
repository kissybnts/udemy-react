import * as React from 'react';
import * as cssClasses from './Toolbar.css';

const toolbar: React.SFC = props => (
  <header className={cssClasses.Toolbar}>
    <div>MENU</div>
    <div>LOGO</div>
    <nav>...</nav>
  </header>
);

export default toolbar;