import { Action } from 'redux';
import { Order } from '../../containers/Orders/Orders';
import { isPurchaseFailAction, isPurchaseSuccessAction } from '../actions';

interface OrderState {
  orders: Order[];
  loading: boolean;
}

const initialState: OrderState = {
  orders: [],
  loading: false
};

const reducer = (state: OrderState = initialState, action: Action): OrderState => {
  if (isPurchaseSuccessAction(action)) {
    return {
      ...state,
      orders: state.orders.concat({ id: action.id, ...action.orderData }),
      loading: false
    }
  } else if (isPurchaseFailAction(action)) {
    return {
      ...state,
      loading: false
    }
  }

  return state;
};

export default reducer;