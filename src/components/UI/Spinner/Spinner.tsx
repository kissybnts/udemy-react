import * as React from 'react';
import * as cssClasses from './Spinner.css';

const spinner: React.SFC = props => (
  <div className={cssClasses.Loader}>Loading...</div>
);

export default spinner;