import { Action } from 'redux';
import { Order, OrderData } from '../../containers/Orders/Orders';

const PURCHASE_REQUEST = 'PURCHASE_REQUEST';
const PURCHASE_REQUEST_START = 'PURCHASE_REQUEST_START';
const PURCHASE_REQUEST_SUCCESS = 'PURCHASE_REQUEST_SUCCESS';
const PURCHASE_REQUEST_FAIL = 'PURCHASE_REQUEST_FAIL';
const PURCHASE_INIT = 'PURCHASE_INIT';

const FETCH_ORDERS_REQUEST = 'FETCH_ORDERS_REQUEST';
const FETCH_ORDERS_REQUEST_SUCCESS = 'FETCH_ORDERS_REQUEST_SUCCESS';
const FETCH_ORDERS_REQUEST_FAIL = 'FETCH_ORDERS_REQUEST_FAIL';
const FETCH_ORDERS_REQUEST_START = 'FETCH_ORDERS_REQUEST_START';

export interface PurchaseRequestAction extends Action {
  orderData: OrderData;
}
export const isPurchaseRequestAction = (action: Action): action is PurchaseRequestAction => action.type === PURCHASE_REQUEST;
export const createPurchaseRequestAction = (orderData: OrderData): PurchaseRequestAction => ({ type: PURCHASE_REQUEST, orderData: orderData });

export interface PurchaseRequestStartAction extends Action {}
export const isPurchaseRequestStartAction = (action: Action): action is PurchaseRequestStartAction => action.type === PURCHASE_REQUEST_START;
export const createPurchaseRequestStartAction = (): PurchaseRequestStartAction => ({ type: PURCHASE_REQUEST_START });

export interface PurchaseRequestSuccessAction extends Action {
  id: string;
  orderData: OrderData;
}
export const isPurchaseRequestSuccessAction = (action: Action): action is PurchaseRequestSuccessAction => action.type === PURCHASE_REQUEST_SUCCESS;
export const createPurchaseRequestSuccessAction = (id: string, orderData: OrderData): PurchaseRequestSuccessAction => ({ type: PURCHASE_REQUEST_SUCCESS, id: id, orderData: orderData });

export interface PurchaseRequestFailAction extends Action {
  error: any;
}
export const isPurchaseRequestFailAction = (action: Action): action is PurchaseRequestFailAction => action.type === PURCHASE_REQUEST_FAIL;
export const createPurchaseRequestFailAction = (error: any): PurchaseRequestFailAction => ({ type: PURCHASE_REQUEST_FAIL, error: error });

export interface PurchaseInitAction extends Action {}
export const isPurchaseInitAction = (action: Action): action is PurchaseInitAction => action.type === PURCHASE_INIT;
export const createPurchaseInitAction = (): PurchaseInitAction => ({ type: PURCHASE_INIT });

export interface FetchOrdersRequestAction extends Action {}
export const isFetchOrdersRequestAction = (action: Action): action is FetchOrdersRequestAction => action.type === FETCH_ORDERS_REQUEST;
export const createFetchOrdersRequestAction = (): FetchOrdersRequestAction => ({ type: FETCH_ORDERS_REQUEST });

export interface FetchOrdersRequestSuccessAction extends Action {
  orders: Order[];
}
export const isFetchOrdersRequestSuccessAction = (action: Action): action is FetchOrdersRequestSuccessAction => action.type === FETCH_ORDERS_REQUEST_SUCCESS;
export const createFetchOrdersRequestSuccessAction = (orders: Order[]): FetchOrdersRequestSuccessAction => ({ type: FETCH_ORDERS_REQUEST_SUCCESS, orders: orders });

export interface FetchOrdersRequestFailAction extends Action {
  error: any;
}
export const isFetchOrdersRequestFailAction = (action: Action): action is FetchOrdersRequestFailAction => action.type === FETCH_ORDERS_REQUEST_FAIL;
export const createFetchOrdersRequestFailAction = (error: any): FetchOrdersRequestFailAction => ({ type: FETCH_ORDERS_REQUEST_FAIL, error: error });

export interface FetchOrdersRequestStartAction extends Action {}
export const isFetchOrdersRequestStartAction = (action: Action): action is FetchOrdersRequestStartAction => action.type === FETCH_ORDERS_REQUEST_START;
export const createFetchOrdersRequestStartAction = (): FetchOrdersRequestStartAction => ({ type: FETCH_ORDERS_REQUEST_START });