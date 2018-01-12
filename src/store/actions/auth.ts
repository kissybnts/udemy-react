import { AuthResponse } from '../saga/API/auth';

enum ActionTypes {
  AuthRequest = 'AuthRequest',
  AuthRequestStart = 'AuthRequestStart',
  AuthRequestSuccess = 'AuthRequestSuccess',
  AuthRequestFail = 'AuthRequestFail',

  AuthLogout = 'AuthLogout',

  SetAuthRedirectPath = 'SetAuthRedirectPath',
}

export interface AuthAction {
  type: ActionTypes;
}

export interface AuthRequestAction extends AuthAction {
  email: string;
  password: string;
  isSignUp: boolean;
}
export const isAuthRequestAction = (action: AuthAction): action is AuthRequestAction => action.type === ActionTypes.AuthRequest;
export const createAuthRequestAction = (email: string, password: string, isSignUp: boolean): AuthRequestAction => ({
  type: ActionTypes.AuthRequest,
  email: email,
  password: password,
  isSignUp: isSignUp,
});

export interface AuthRequestStartAction extends AuthAction {}
export const isAuthRequestStartAction = (action: AuthAction): action is AuthRequestStartAction => action.type === ActionTypes.AuthRequestStart;
export const createAuthRequestStartAction = (): AuthRequestStartAction => ({ type: ActionTypes.AuthRequestStart });

export interface AuthRequestSuccessAction extends AuthAction {
  data: AuthResponse;
}
export const isAuthRequestSuccessAction = (action: AuthAction): action is AuthRequestSuccessAction => action.type === ActionTypes.AuthRequestSuccess;
export const createAuthRequestSuccessAction = (data: AuthResponse): AuthRequestSuccessAction => ({
  type: ActionTypes.AuthRequestSuccess,
  data: data
});

export interface AuthRequestFailAction extends AuthAction {
  error: any;
}
export const isAuthRequestFailAction = (action: AuthAction): action is AuthRequestFailAction => action.type === ActionTypes.AuthRequestFail;
export const createAuthRequestFailAction = (error: any): AuthRequestFailAction => ({
  type: ActionTypes.AuthRequestFail,
  error: error,
});

export interface AuthLogoutAction extends AuthAction {}
export const isAuthLogoutAction = (action: AuthAction): action is AuthLogoutAction => action.type === ActionTypes.AuthLogout;
export const createAuthLogoutAction = (): AuthLogoutAction => ({ type: ActionTypes.AuthLogout });

export interface SetAuthRedirectPathAction extends AuthAction {
  path: string;
}
export const isSetAuthRedirectPathAction = (action: AuthAction): action is SetAuthRedirectPathAction => action.type === ActionTypes.SetAuthRedirectPath;
export const createSetAuthRedirectPathAction = (path: string): SetAuthRedirectPathAction => ({
  type: ActionTypes.SetAuthRedirectPath,
  path: path,
});