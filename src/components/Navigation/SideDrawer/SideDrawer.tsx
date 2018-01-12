import * as React from 'react';
import * as cssClasses from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

interface Props {
  isAuthenticated: boolean;
  open: boolean;
  closed: () => void;
}

const sideDrawer: React.SFC<Props> = props => {
  const classes = [cssClasses.SideDrawer];
  classes.push(props.open ? cssClasses.Open : cssClasses.Close);

  return (
    <React.Fragment>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={classes.join(' ')} onClick={props.closed}>
        <div className={cssClasses.Logo}>
          <Logo/>
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuthenticated}/>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default sideDrawer;