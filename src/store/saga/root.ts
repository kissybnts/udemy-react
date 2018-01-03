import { fork } from 'redux-saga/effects';
import { handleFetchIngredients } from './API/ingredients';
import { handlePurchaseRequest } from './API/orders';

export default function* rootSage() {
  yield fork(handleFetchIngredients);
  yield fork(handlePurchaseRequest);
}