import * as React from 'react';
import * as cssClasses from './Orders.css';
import Order from '../../components/Order/Order';
import { Ingredients } from '../BurgerBuilder/BurgerBuilder';
import { RouteComponentProps } from 'react-router';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

interface State {
  orders: Order[];
  loading: boolean;
}

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    address: {
      street: string;
      postalCode: string;
    }
  }
  ingredients: Ingredients;
  totalPrice: number;
  deliveryMethod: string;
}

class Orders extends React.Component<RouteComponentProps<{}>, State> {
  state: State = {
    orders: [],
    loading: true
  };

  componentDidMount(){
    axios.get('/orders.json')
      .then(response => {
        const orders: Order[] = Object.keys(response.data).map(key => {
          return {
            id: key,
            ...response.data[key]
          }
        });

        this.setState({ loading: false, orders: orders });
      })
      .catch(error => {
        this.setState({ loading: false });
      })
  }

  render() {
    const orders = this.state.orders.map(order => (
      <Order key={order.id} ingredients={order.ingredients} price={+order.totalPrice}/>
    ));
    return (
      <div className={cssClasses.Orders}>
        {orders}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);