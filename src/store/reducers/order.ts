import { Action } from 'redux';
import { Order } from '../../containers/Orders/Orders';
import {
  isFetchOrdersRequestFailAction, isFetchOrdersRequestStartAction,
  isFetchOrdersRequestSuccessAction, isPurchaseInitAction,
  isPurchaseRequestFailAction, isPurchaseRequestStartAction,
  isPurchaseRequestSuccessAction
} from '../actions';

export interface OrderState {
  orders: Order[];
  loading: boolean;
  purchased: boolean;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state: OrderState = initialState, action: Action): OrderState => {
  if (isPurchaseRequestSuccessAction(action)) {
    return {
      ...state,
      orders: state.orders.concat({ id: action.id, ...action.orderData }),
      loading: false,
      purchased: true,
    };
  } else if (isFetchOrdersRequestSuccessAction(action)) {
    return {
      ...state,
      orders: action.orders,
      loading: false
    }
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
  } else if (isPurchaseInitAction(action)) {
    return {
      ...state,
      purchased: false
    }
  } else if (isFetchOrdersRequestFailAction(action)) {
    return {
      ...state,
      loading: false
    }
  } else if (isFetchOrdersRequestStartAction(action)) {
    return {
      ...state,
      loading: true
    }
  }

  return state;
};

export default reducer;