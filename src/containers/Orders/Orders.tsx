import * as React from 'react';
import * as cssClasses from './Orders.css';
import Order from '../../components/Order/Order';

class Orders extends React.Component {
  render() {
    return (
      <div className={cssClasses.Orders}>
        <Order/>
        <Order/>
      </div>
    );
  }
}

export default Orders;