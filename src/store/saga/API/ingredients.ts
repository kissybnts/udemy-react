import { call, put, take } from 'redux-saga/effects';
import axios from '../../../axios-orders';
import { createFetchIngredientsFailedAction, createFetchIngredientsSuccessAction, isFetchIngredientsAction } from '../../actions/index';

const fetchIngredients = () => axios.get('/ingredients.json');

export function* handleFetchIngredients() {
  while (true) {
    yield take(isFetchIngredientsAction);
    const response = yield call(fetchIngredients);
    if (response.status && response.status.toString().startsWith('2')) {
      yield put(createFetchIngredientsSuccessAction({ ...response.data }));
    } else {
      yield put(createFetchIngredientsFailedAction());
    }
  }
}