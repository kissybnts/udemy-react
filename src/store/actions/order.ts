import { Action } from 'redux';
import { OrderData } from '../../containers/Orders/Orders';

const PURCHASE_REQUEST = 'PURCHASE_REQUEST';
const PURCHASE_REQUEST_START = 'PURCHASE_REQUEST_START';
const PURCHASE_REQUEST_SUCCESS = 'PURCHASE_REQUEST_SUCCESS';
const PURCHASE_REQUEST_FAIL = 'PURCHASE_REQUEST_FAIL';

export interface PurchaseRequestAction extends Action {
  orderData: OrderData;
}
export const isPurchaseRequestAction = (action: Action): action is PurchaseRequestAction => action.type === PURCHASE_REQUEST;
export const createPurchaseRequestAction = (orderData: OrderData): PurchaseRequestAction => ({ type: PURCHASE_REQUEST, orderData: orderData });

interface PurchaseRequestStartAction extends Action {}
export const isPurchaseRequestStartAction = (action: Action): action is PurchaseRequestStartAction => action.type === PURCHASE_REQUEST_START;
export const createPurchaseRequestStartAction = (): PurchaseRequestStartAction => ({ type: PURCHASE_REQUEST_START });

interface PurchaseRequestSuccessAction extends Action {
  id: string;
  orderData: OrderData;
}
export const isPurchaseRequestSuccessAction = (action: Action): action is PurchaseRequestSuccessAction => action.type === PURCHASE_REQUEST_SUCCESS;
export const createPurchaseRequestSuccessAction = (id: string, orderData: OrderData): PurchaseRequestSuccessAction => ({ type: PURCHASE_REQUEST_SUCCESS, id: id, orderData: orderData });

interface PurchaseRequestFailAction extends Action {
  error: any;
}
export const isPurchaseRequestFailAction = (action: Action): action is PurchaseRequestFailAction => action.type === PURCHASE_REQUEST_FAIL;
export const createPurchaseRequestFailAction = (error: any): PurchaseRequestFailAction => ({ type: PURCHASE_REQUEST_FAIL, error: error });