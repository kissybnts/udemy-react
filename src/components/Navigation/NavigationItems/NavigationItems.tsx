import * as React from 'react';
import * as cssClasses from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems: React.SFC = props => (
  <ul className={cssClasses.NavigationItems}>
    <NavigationItem link="/" active={true}>Burger Builder</NavigationItem>
    <NavigationItem link="/" active={false}>Checkout</NavigationItem>
  </ul>
);

export default navigationItems;