import * as React from 'react';
import * as cssClasses from './NavigationItem.css';
import { NavLink } from 'react-router-dom';

interface Props {
  link: string;
  exact: boolean;
}

const navigationItem: React.SFC<Props> = props => (
  <li className={cssClasses.NavigationItem}>
    <NavLink
      to={props.link}
      exact={props.exact}
      activeClassName={cssClasses.Active}
    >{props.children}</NavLink>
  </li>
);

export default navigationItem;