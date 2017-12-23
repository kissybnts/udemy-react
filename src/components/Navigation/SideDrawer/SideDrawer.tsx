import * as React from 'react';
import * as cssClasses from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const sideDrawer: React.SFC = props => {
  return (
    <div className={cssClasses.SideDrawer}>
      <div className={cssClasses.Logo}>
        <Logo/>
      </div>
      <nav>
        <NavigationItems/>
      </nav>
    </div>
  );
};

export default sideDrawer;