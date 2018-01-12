import { Action } from 'redux';
import { Order } from '../../containers/Orders/Orders';
import {
  isFetchOrdersRequestFailAction, isFetchOrdersRequestStartAction,
  isFetchOrdersRequestSuccessAction, isPurchaseInitAction,
  isPurchaseRequestFailAction, isPurchaseRequestStartAction,
  isPurchaseRequestSuccessAction, PurchaseRequestSuccessAction
} from '../actions';
import { updateObject } from '../../shared/utility';

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

const purchaseRequestSuccess = (state: OrderState, action: PurchaseRequestSuccessAction): OrderState => {
  return updateObject(state, {
    orders: state.orders.concat({ id: action.id, ...action.orderData }),
    loading: false,
    purchased: true,
  });
};

const reducer = (state: OrderState = initialState, action: Action): OrderState => {
  if (isPurchaseRequestSuccessAction(action)) {
    return purchaseRequestSuccess(state, action);
  }

  if (isFetchOrdersRequestSuccessAction(action)) {
    return updateObject(state, {
      orders: action.orders,
      loading: false,
    });
  }

  if (isPurchaseRequestFailAction(action)) {
    return updateObject(state, {
      loading: false,
    });
  }

  if (isPurchaseRequestStartAction(action)) {
    return updateObject(state, {
      loading: true,
    });
  }

  if (isPurchaseInitAction(action)) {
    return updateObject(state, {
      purchased: false
    });
  }

  if (isFetchOrdersRequestFailAction(action)) {
    return updateObject(state, {
      loading: false,
    });
  }

  if (isFetchOrdersRequestStartAction(action)) {
    return updateObject(state, {
      loading: true,
    });
  }

  return state;
};

export default reducer;