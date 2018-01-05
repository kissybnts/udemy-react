import { Action } from 'redux';
import { Order } from '../../containers/Orders/Orders';
import {
  isFetchOrdersRequestFailAction, isFetchOrdersRequestStartAction,
  isFetchOrdersRequestSuccessAction, isPurchaseInitAction,
  isPurchaseRequestFailAction, isPurchaseRequestStartAction,
  isPurchaseRequestSuccessAction
} from '../actions';
import { updateObject } from '../utility';

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
    return updateObject(state, {
      orders: state.orders.concat({ id: action.id, ...action.orderData }),
      loading: false,
      purchased: true,
    });
  } else if (isFetchOrdersRequestSuccessAction(action)) {
    return updateObject(state, {
      orders: action.orders,
      loading: false,
    });
  } else if (isPurchaseRequestFailAction(action)) {
    return updateObject(state, {
      loading: false,
    });
  } else if (isPurchaseRequestStartAction(action)) {
    return updateObject(state, {
      loading: true,
    });
  } else if (isPurchaseInitAction(action)) {
    return updateObject(state, {
      purchased: false
    });
  } else if (isFetchOrdersRequestFailAction(action)) {
    return updateObject(state, {
      loading: false,
    });
  } else if (isFetchOrdersRequestStartAction(action)) {
    return updateObject(state, {
      loading: true,
    });
  }

  return state;
};

export default reducer;