import { fork } from 'redux-saga/effects';
import { handleFetchIngredients } from './API/ingredients';
import { handleFetchOrdersRequest, handlePurchaseRequest } from './API/orders';
import { handleAuthRequest, handleCheckAuthState } from './API/auth';

export default function* rootSage() {
  yield fork(handleFetchIngredients);
  yield fork(handlePurchaseRequest);
  yield fork(handleFetchOrdersRequest);
  yield fork(handleAuthRequest);
  yield fork(handleCheckAuthState);
}