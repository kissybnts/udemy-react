import { fork } from 'redux-saga/effects';
import { handleFetchIngredients } from './API/ingredients';

export default function* rootSage() {
  yield fork(handleFetchIngredients)
}