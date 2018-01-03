import { Action } from 'redux';

const PURCHASE_REQUEST = 'PURCHASE_REQUEST';
const PURCHASE_SUCCESS = 'PURCHASE_SUCCESS';
const PURCHASE_FAIL = 'PURCHASE_FAIL';

export interface PurchaseRequestAction extends Action {
  orderData: any;
}
export const isPurchaseRequestAction = (action: Action): action is PurchaseRequestAction => action.type === PURCHASE_REQUEST;
export const createPurchaseRequestAction = (orderData: { [key: string]: string }): PurchaseRequestAction => ({ type: PURCHASE_REQUEST, orderData: orderData });

interface PurchaseSuccessAction extends Action {
  id: string;
  orderData: any;
}
export const isPurchaseSuccessAction = (action: Action): action is PurchaseSuccessAction => action.type === PURCHASE_SUCCESS;
export const createPurchaseSuccessAction = (id: string, orderData: any): PurchaseSuccessAction => ({ type: PURCHASE_SUCCESS, id: id, orderData: orderData });

interface PurchaseFailAction extends Action {
  error: any;
}
export const isPurchaseFailAction = (action: Action): action is PurchaseFailAction => action.type === PURCHASE_FAIL;
export const createPurchaseFailAction = (error: any): PurchaseFailAction => ({ type: PURCHASE_FAIL, error: error });