import {
  AuthAction, isAuthLogoutAction, isAuthRequestFailAction, isAuthRequestStartAction, isAuthRequestSuccessAction,
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

const reducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
  if (isSetAuthRedirectPathAction(action)) {
    return updateObject(state, {
      redirectPath: action.path,
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
    return updateObject(state, {
      idToken: undefined,
      userId: undefined,
    });
  }

  return state;
};

export default reducer;