import * as React from 'react';
import * as cssClasses from './Order.css';

const order: React.SFC = props => (
  <div className={cssClasses.Order}>
    <p>Ingredients: Salad const (1)</p>
    <p>Price: <strong>USD 5.25</strong></p>
  </div>
);

export default order;