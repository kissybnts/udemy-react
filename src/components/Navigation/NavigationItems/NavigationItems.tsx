import * as React from 'react';
import * as cssClasses from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

interface Props {
  isAuthenticated: boolean;
}

const navigationItems: React.SFC<Props> = props => (
  <ul className={cssClasses.NavigationItems}>
    <NavigationItem link="/" exact={true}>Burger Builder</NavigationItem>
    {props.isAuthenticated ? <NavigationItem link="/orders" exact={false}>Order</NavigationItem> : null}
    {props.isAuthenticated
      ? <NavigationItem link="/logout" exact={false}>Logout</NavigationItem>
      : <NavigationItem link="/auth" exact={false}>Authenticate</NavigationItem>}
  </ul>
);

export default navigationItems;