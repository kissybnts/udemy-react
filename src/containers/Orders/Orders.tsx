import * as React from 'react';
import * as cssClasses from './Orders.css';
import Order from '../../components/Order/Order';
import { Ingredients } from '../BurgerBuilder/BurgerBuilder';
import { RouteComponentProps } from 'react-router';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { ReduxState } from '../../index';
import { Action, Dispatch } from 'redux';
import { createFetchOrdersRequestAction } from '../../store/actions';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

interface Props extends RouteComponentProps<{}> {
  orders: Order[];
  loading: boolean;
  onInitOrders: () => void;
}

export interface Order extends OrderData{
  id: string;
}

export interface OrderData {
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

class Orders extends React.Component<Props, {}> {
  componentDidMount(){
    this.props.onInitOrders();
  }

  render() {
    if (this.props.loading) {
      return <Spinner />
    }
    const orders = this.props.orders.map(order => (
      <Order key={order.id} ingredients={order.ingredients} price={+order.totalPrice}/>
    ));
    return (
      <div className={cssClasses.Orders}>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  orders: state.order.orders,
  loading: state.order.loading,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onInitOrders: () => dispatch(createFetchOrdersRequestAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));