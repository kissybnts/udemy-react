import { take } from 'redux-saga/effects';
import { AuthRequestAction, isAuthRequestAction } from '../../actions/auth';

export function* handleAuthRequest() {
  while (true) {
    const action: AuthRequestAction = yield take(isAuthRequestAction);
    console.log(action);
  }
}