import { call, fork, put, take } from 'redux-saga/effects';
import {
  AuthRequestAction, createAuthLogoutAction, createAuthRequestFailAction, createAuthRequestStartAction, createAuthRequestSuccessAction,
  createAutomaticallyAuthSuccessAction,
  isAuthRequestAction, isAutomaticallyAuthAction
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
        const expirationDate = new Date(new Date().getTime() + (parseInt(response.data.expiresIn, 10) * 1000));
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate.toString());
        localStorage.setItem('userId', response.data.localId);

        yield put(createAuthRequestSuccessAction(response.data));
        if (task && task.isRunning()) {
          task.cancel();
        }
        task = yield fork(handleReserveLogout, parseInt(response.data.expiresIn, 10) * 1000);
      }
    } catch (err) {
      yield put(createAuthRequestFailAction(err.response.data.error));
    }
  }
}

function* handleReserveLogout(milliSeconds: number) {
  yield call(delay, milliSeconds);
  yield put(createAuthLogoutAction());
}

export function* handleCheckAuthState() {
  while (true) {
    yield take(isAutomaticallyAuthAction);
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expirationDate');
    const userId = localStorage.getItem('userId');
    if (!token || !expiration || !userId) {
      yield put(createAuthLogoutAction());
    } else {
      const expirationDate = new Date(expiration);
      const now = new Date();
      if (expirationDate > now) {
        yield put(createAutomaticallyAuthSuccessAction(token, userId));
        yield fork(handleReserveLogout, (expirationDate.getTime() - now.getTime()));
      } else {
        yield put(createAuthLogoutAction());
      }
    }
  }
}