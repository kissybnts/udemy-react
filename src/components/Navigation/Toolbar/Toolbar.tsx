import * as React from 'react';
import * as cssClasses from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

interface Props {
  isAuthenticated: boolean;
  drawerToggleClicked: () => void;
}

const toolbar: React.SFC<Props> = props => (
  <header className={cssClasses.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked}/>
    <div className={cssClasses.Logo}>
      <Logo/>
    </div>
    <nav className={cssClasses.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuthenticated}/>
    </nav>
  </header>
);

export default toolbar;