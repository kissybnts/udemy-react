import axios from '../../../axios-orders';
import { call, put, take } from 'redux-saga/effects';
import {
  createFetchOrdersRequestFailAction, createFetchOrdersRequestStartAction, createFetchOrdersRequestSuccessAction,
  createPurchaseRequestFailAction, createPurchaseRequestStartAction, createPurchaseRequestSuccessAction, isFetchOrdersRequestAction,
  isPurchaseRequestAction,
  PurchaseRequestAction
} from '../../actions';
import { Order } from '../../../containers/Orders/Orders';

export function* handlePurchaseRequest() {
  while (true) {
    const action: PurchaseRequestAction = yield take(isPurchaseRequestAction);
    const response = yield call(axios.post, '/orders.json', action.orderData);
    yield put(createPurchaseRequestStartAction());
    if (response.status && response.status.toString().startsWith('2')) {
      yield put(createPurchaseRequestSuccessAction(response.data.name, action.orderData));
    } else {
      yield put(createPurchaseRequestFailAction(response.message ? response.message : null));
    }
  }
}

export function* handleFetchOrdersRequest() {
  while (true) {
    yield take(isFetchOrdersRequestAction);
    yield put(createFetchOrdersRequestStartAction());
    const response = yield call(axios.get, '/orders.json');
    if (response.status && response.status.toString().startsWith('2')) {
      const orders: Order[] = response.data !== null ? Object.keys(response.data).map(key => {
        return {
          id: key,
          ...response.data[key]
        };
      }) : [];
      yield put(createFetchOrdersRequestSuccessAction(orders));
    } else {
      yield put(createFetchOrdersRequestFailAction(response.message ? response.message : null));
    }
  }
}