import * as React from 'react';
import * as cssClasses from './Toolbar.css';
import Logo from '../../Logo/Logo';

const toolbar: React.SFC = props => (
  <header className={cssClasses.Toolbar}>
    <div>MENU</div>
    <Logo/>
    <nav>...</nav>
  </header>
);

export default toolbar;