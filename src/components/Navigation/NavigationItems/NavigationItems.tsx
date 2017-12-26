import * as React from 'react';
import * as cssClasses from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems: React.SFC = props => (
  <ul className={cssClasses.NavigationItems}>
    <NavigationItem link="/" exact={true}>Burger Builder</NavigationItem>
    <NavigationItem link="/orders" exact={false}>Order</NavigationItem>
  </ul>
);

export default navigationItems;