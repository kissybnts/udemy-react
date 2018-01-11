import { AuthResponse } from '../saga/API/auth';

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