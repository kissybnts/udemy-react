import { Action } from 'redux';
import { Order } from '../../containers/Orders/Orders';
import {
  isPurchaseRequestFailAction,
  isPurchaseRequestStartAction,
  isPurchaseRequestSuccessAction
} from '../actions';

interface OrderState {
  orders: Order[];
  loading: boolean;
}

const initialState: OrderState = {
  orders: [],
  loading: false
};

const reducer = (state: OrderState = initialState, action: Action): OrderState => {
  if (isPurchaseRequestSuccessAction(action)) {
    return {
      ...state,
      orders: state.orders.concat({ id: action.id, ...action.orderData }),
      loading: false
    };
  } else if (isPurchaseRequestFailAction(action)) {
    return {
      ...state,
      loading: false
    };
  } else if (isPurchaseRequestStartAction(action)) {
    return {
      ...state,
      loading: true
    };
  }

  return state;
};

export default reducer;