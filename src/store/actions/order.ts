import { Action } from 'redux';
import { OrderData } from '../../containers/Orders/Orders';

const PURCHASE_REQUEST = 'PURCHASE_REQUEST';
const PURCHASE_SUCCESS = 'PURCHASE_SUCCESS';
const PURCHASE_FAIL = 'PURCHASE_FAIL';

export interface PurchaseRequestAction extends Action {
  orderData: OrderData;
}
export const isPurchaseRequestAction = (action: Action): action is PurchaseRequestAction => action.type === PURCHASE_REQUEST;
export const createPurchaseRequestAction = (orderData: OrderData): PurchaseRequestAction => ({ type: PURCHASE_REQUEST, orderData: orderData });

interface PurchaseSuccessAction extends Action {
  id: string;
  orderData: OrderData;
}
export const isPurchaseSuccessAction = (action: Action): action is PurchaseSuccessAction => action.type === PURCHASE_SUCCESS;
export const createPurchaseSuccessAction = (id: string, orderData: OrderData): PurchaseSuccessAction => ({ type: PURCHASE_SUCCESS, id: id, orderData: orderData });

interface PurchaseFailAction extends Action {
  error: any;
}
export const isPurchaseFailAction = (action: Action): action is PurchaseFailAction => action.type === PURCHASE_FAIL;
export const createPurchaseFailAction = (error: any): PurchaseFailAction => ({ type: PURCHASE_FAIL, error: error });