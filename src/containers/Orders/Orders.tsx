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
  state = {
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

        console.log(orders);

        this.setState({ loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
      })
  }

  render() {
    return (
      <div className={cssClasses.Orders}>
        <Order/>
        <Order/>
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);