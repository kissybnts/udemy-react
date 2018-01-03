import axios from '../../../axios-orders';
import { call, put, take } from 'redux-saga/effects';
import { createPurchaseFailAction, createPurchaseSuccessAction, isPurchaseRequestAction, PurchaseRequestAction } from '../../actions';

export function* handlePurchaseRequest() {
  while (true) {
    const action: PurchaseRequestAction = yield take(isPurchaseRequestAction);
    const response = yield call(axios.post, '/orders.json', action.orderData);
    console.log(response);
    if (response.status && response.status.toString().startsWith('2')) {
      yield put(createPurchaseSuccessAction(response.data.name, action.orderData));
    } else {
      yield put(createPurchaseFailAction(response.message ? response.message : null));
    }
  }
}