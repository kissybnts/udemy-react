import {
  AuthAction, AuthLogoutAction, isAuthLogoutAction, isAuthRequestFailAction, isAuthRequestStartAction, isAuthRequestSuccessAction,
  isAutomaticallyAuthSuccessAction,
  isSetAuthRedirectPathAction
} from '../actions/auth';
import { updateObject } from '../utility';

export interface AuthState {
  idToken?: string;
  userId?: string;
  error?: any;
  loading: boolean;
  redirectPath: string;
}

const initialState: AuthState = {
  idToken: undefined,
  userId: undefined,
  error: undefined,
  loading: false,
  redirectPath: '/',
};

const authLogout = (state: AuthState, action: AuthLogoutAction): AuthState => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');

  return updateObject(state, {
    idToken: undefined,
    userId: undefined,
  });
};

const reducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
  if (isSetAuthRedirectPathAction(action)) {
    return updateObject(state, {
      redirectPath: action.path,
    });
  }

  if (isAutomaticallyAuthSuccessAction(action)) {
    return updateObject(state, {
      idToken: action.token,
      userId: action.userId,
    });
  }

  if (isAuthRequestSuccessAction(action)) {
    return updateObject(state, {
      idToken: action.data.idToken,
      userId: action.data.localId,
      error: undefined,
      loading: false,
    });
  }

  if (isAuthRequestFailAction(action)) {
    return updateObject(state, {
      idToken: undefined,
      userId: undefined,
      error: action.error.message,
      loading: false,
    });
  }

  if (isAuthRequestStartAction(action)) {
    return updateObject(state, {
      loading: true
    });
  }

  if (isAuthLogoutAction(action)) {
    return authLogout(state, action);
  }

  return state;
};

export default reducer;