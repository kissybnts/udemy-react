import * as React from 'react';
import * as cssClasses from './Logo.css';
import burgerLogo from '../../assets/images/burger-logo.png';

const logo: React.SFC = props => (
  <div className={cssClasses.Logo}>
    <img src={burgerLogo} alt="MyBurger"/>
  </div>
);

export default logo;