import { AuthAction, isAuthLogoutAction, isAuthRequestFailAction, isAuthRequestStartAction, isAuthRequestSuccessAction } from '../actions/auth';
import { updateObject } from '../utility';

export interface AuthState {
  idToken?: string;
  userId?: string;
  error?: any;
  loading: boolean;
}

const initialState: AuthState = {
  idToken: undefined,
  userId: undefined,
  error: undefined,
  loading: false,
};

const reducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
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