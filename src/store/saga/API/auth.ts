import { call, fork, put, take } from 'redux-saga/effects';
import {
  AuthRequestAction, createAuthLogoutAction, createAuthRequestFailAction, createAuthRequestStartAction, createAuthRequestSuccessAction,
  isAuthRequestAction
} from '../../actions/auth';
import axios from 'axios';
import { delay } from 'redux-saga';

export interface AuthResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

export function* handleAuthRequest() {
  let task;
  while (true) {
    const action: AuthRequestAction = yield take(isAuthRequestAction);
    yield put(createAuthRequestStartAction());
    const requestData = {
      email: action.email,
      password: action.password,
      returnSecureToken: true,
    };

    const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/${action.isSignUp ? 'signupNewUser' : 'verifyPassword'}?key=AIzaSyDFnvtoqcxvEKKzD01EoCZrUTS60855fuI`;

    try {
      const response = yield call(
        axios.post,
        url,
        requestData);

      if (response.status && response.status.toString().startsWith('2')) {
        yield put(createAuthRequestSuccessAction(response.data));
        if (task && task.isRunning()) {
          task.cancel();
        }
        task = yield fork(handleReserveLogout, parseInt(response.data.expiresIn, 10));
      }
    } catch (err) {
      yield put(createAuthRequestFailAction(err.response.data.error));
    }
  }
}

function* handleReserveLogout(seconds: number) {
  yield call(delay, seconds * 1000);
  yield put(createAuthLogoutAction());
}