enum ActionTypes {
  AuthRequest = 'AuthRequest',
  AuthRequestStart = 'AuthRequestStart',
  AuthRequestSuccess = 'AuthRequestSuccess',
  AuthRequestFail = 'AuthRequestFail',
}

export interface AuthAction {
  type: ActionTypes;
}

export interface AuthRequestAction extends AuthAction {
  email: string;
  password: string;
}
export const isAuthRequestAction = (action: AuthAction): action is AuthRequestAction => action.type === ActionTypes.AuthRequest;
export const createAuthRequestAction = (email: string, password: string): AuthRequestAction => ({
  type: ActionTypes.AuthRequest,
  email: email,
  password: password,
});

export interface AuthRequestStartAction extends AuthAction {}
export const isAuthRequestStartAction = (action: AuthAction): action is AuthRequestStartAction => action.type === ActionTypes.AuthRequestStart;
export const createAuthRequestStartAction = (): AuthRequestStartAction => ({ type: ActionTypes.AuthRequestStart });

export interface AuthRequestSuccessAction extends AuthAction {}
export const isAuthRequestSuccessAction = (action: AuthAction): action is AuthRequestSuccessAction => action.type === ActionTypes.AuthRequestSuccess;
export const createAuthRequestSuccessAction = (): AuthRequestSuccessAction => ({ type: ActionTypes.AuthRequestSuccess });

export interface AuthRequestFailAction extends AuthAction {}
export const isAuthRequestFailAction = (action: AuthAction): action is AuthRequestFailAction => action.type === ActionTypes.AuthRequestFail;
export const createAuthRequestFailAction = (): AuthRequestFailAction => ({ type: ActionTypes.AuthRequestFail });