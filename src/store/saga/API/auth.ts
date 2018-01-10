import { call, put, take } from 'redux-saga/effects';
import {
  AuthRequestAction, createAuthRequestFailAction, createAuthRequestStartAction, createAuthRequestSuccessAction,
  isAuthRequestAction
} from '../../actions/auth';
import axios from 'axios';

export interface AuthResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

export function* handleAuthRequest() {
  while (true) {
    const action: AuthRequestAction = yield take(isAuthRequestAction);
    yield put(createAuthRequestStartAction());
    const requestData = {
      email: action.email,
      password: action.password,
      returnSecureToken: true
    };
    const response = yield call(
      axios.post,
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDFnvtoqcxvEKKzD01EoCZrUTS60855fuI',
      requestData);

    if (response.status && response.status.toString().startsWith('2')) {
      yield put(createAuthRequestSuccessAction(response.data));
    } else {
      yield put(createAuthRequestFailAction(response.message ? response.message : null));
    }
  }
}