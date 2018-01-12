import { Action } from 'redux';
import { Order, OrderData } from '../../containers/Orders/Orders';

enum ActionTypes {
  PurchaseRequest = 'PurchaseRequest',
  PurchaseRequestStart = 'PurchaseRequestStart',
  PurchaseRequestSuccess = 'PurchaseRequestSuccess',
  PurchaseRequestFail = 'PurchaseRequestFail',
  PurchaseInit = 'PurchaseInit',

  FetchOrdersRequest = 'FetchOrdersRequest',
  FetchOrdersRequestStart = 'FetchOrdersRequestStart',
  FetchOrdersRequestSuccess = 'FetchOrdersRequestSuccess',
  FetchOrdersRequestFail = 'FetchOrdersRequestFail',
}

export interface OrderAction extends Action {
  type: ActionTypes;
}

export interface PurchaseRequestAction extends OrderAction {
  orderData: OrderData;
  token: string;
}
export const isPurchaseRequestAction = (action: Action): action is PurchaseRequestAction => action.type === ActionTypes.PurchaseRequest;
export const createPurchaseRequestAction = (orderData: OrderData, token: string): PurchaseRequestAction => ({
  type: ActionTypes.PurchaseRequest,
  orderData: orderData, token: token,
});

export interface PurchaseRequestStartAction extends OrderAction {}
export const isPurchaseRequestStartAction = (action: Action): action is PurchaseRequestStartAction => action.type === ActionTypes.PurchaseRequestStart;
export const createPurchaseRequestStartAction = (): PurchaseRequestStartAction => ({ type: ActionTypes.PurchaseRequestStart });

export interface PurchaseRequestSuccessAction extends OrderAction {
  id: string;
  orderData: OrderData;
}
export const isPurchaseRequestSuccessAction = (action: Action): action is PurchaseRequestSuccessAction => action.type === ActionTypes.PurchaseRequestSuccess;
export const createPurchaseRequestSuccessAction = (id: string, orderData: OrderData): PurchaseRequestSuccessAction => ({
  type: ActionTypes.PurchaseRequestSuccess,
  id: id, orderData: orderData
});

export interface PurchaseRequestFailAction extends OrderAction {
  error: any;
}
export const isPurchaseRequestFailAction = (action: Action): action is PurchaseRequestFailAction => action.type === ActionTypes.PurchaseRequestFail;
export const createPurchaseRequestFailAction = (error: any): PurchaseRequestFailAction => ({
  type: ActionTypes.PurchaseRequestFail,
  error: error
});

export interface PurchaseInitAction extends OrderAction {}
export const isPurchaseInitAction = (action: Action): action is PurchaseInitAction => action.type === ActionTypes.PurchaseInit;
export const createPurchaseInitAction = (): PurchaseInitAction => ({ type: ActionTypes.PurchaseInit });

export interface FetchOrdersRequestAction extends OrderAction {
  token: string;
  userId: string;
}
export const isFetchOrdersRequestAction = (action: Action): action is FetchOrdersRequestAction => action.type === ActionTypes.FetchOrdersRequest;
export const createFetchOrdersRequestAction = (token: string, userId: string): FetchOrdersRequestAction => ({
  type: ActionTypes.FetchOrdersRequest,
  token: token,
  userId: userId,
});

export interface FetchOrdersRequestSuccessAction extends OrderAction {
  orders: Order[];
}
export const isFetchOrdersRequestSuccessAction = (action: Action): action is FetchOrdersRequestSuccessAction => action.type === ActionTypes.FetchOrdersRequestSuccess;
export const createFetchOrdersRequestSuccessAction = (orders: Order[]): FetchOrdersRequestSuccessAction => ({
  type: ActionTypes.FetchOrdersRequestSuccess,
  orders: orders
});

export interface FetchOrdersRequestFailAction extends OrderAction {
  error: any;
}
export const isFetchOrdersRequestFailAction = (action: Action): action is FetchOrdersRequestFailAction => action.type === ActionTypes.FetchOrdersRequestFail;
export const createFetchOrdersRequestFailAction = (error: any): FetchOrdersRequestFailAction => ({
  type: ActionTypes.FetchOrdersRequestFail,
  error: error
});

export interface FetchOrdersRequestStartAction extends OrderAction {}
export const isFetchOrdersRequestStartAction = (action: Action): action is FetchOrdersRequestStartAction => action.type === ActionTypes.FetchOrdersRequestStart;
export const createFetchOrdersRequestStartAction = (): FetchOrdersRequestStartAction => ({ type: ActionTypes.FetchOrdersRequestStart });