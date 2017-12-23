import * as React from 'react';
import * as cssClasses from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar: React.SFC = props => (
  <header className={cssClasses.Toolbar}>
    <div>MENU</div>
    <div className={cssClasses.Logo}>
      <Logo/>
    </div>
    <nav className={cssClasses.DesktopOnly}>
      <NavigationItems/>
    </nav>
  </header>
);

export default toolbar;