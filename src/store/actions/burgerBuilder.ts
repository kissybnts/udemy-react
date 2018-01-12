import { Action } from 'redux';
import { Ingredients } from '../../containers/BurgerBuilder/BurgerBuilder';

enum ActionnTypes {
  AddIngredient = 'AddIngredient',
  RemoveIngredient = 'RemoveIngredient',

  FetchIngredientsRequest = 'FetchIngredientsRequest',
  FetchIngredientsRequestSuccess = 'FetchIngredientsRequestSuccess',
  FetchIngredientsRequestFail = 'FetchIngredientsRequestFail',
}

export interface BurgerBuilderAction extends Action {
  type: ActionnTypes;
}

export interface AddIngredientAction extends BurgerBuilderAction {
  ingredientName: string;
}
export const isAddIngredientAction = (action: Action): action is AddIngredientAction => action.type === ActionnTypes.AddIngredient;
export const createAddIngredientAction = (ingName: string): AddIngredientAction => ({ type: ActionnTypes.AddIngredient, ingredientName: ingName });

export interface RemoveIngredientAction extends BurgerBuilderAction {
  ingredientName: string;
}
export const isRemoveIngredientAction = (action: Action): action is RemoveIngredientAction => action.type === ActionnTypes.RemoveIngredient;
export const createRemoveIngredientAction = (ingName: string): RemoveIngredientAction => ({ type: ActionnTypes.RemoveIngredient, ingredientName: ingName });

interface FetchIngredientsAction extends BurgerBuilderAction {}
export const isFetchIngredientsAction = (action: Action): action is FetchIngredientsAction => action.type === ActionnTypes.FetchIngredientsRequest;
export const createFetchIngredientsAction = (): FetchIngredientsAction => ({ type: ActionnTypes.FetchIngredientsRequest });

export interface FetchIngredientsSuccessAction extends BurgerBuilderAction {
  ingredients: Ingredients;
}
export const isFetchIngredientsSuccessAction = (action: Action): action is FetchIngredientsSuccessAction => action.type === ActionnTypes.FetchIngredientsRequestSuccess;
export const createFetchIngredientsSuccessAction = (ingredients: Ingredients): FetchIngredientsSuccessAction => ({ type: ActionnTypes.FetchIngredientsRequestSuccess, ingredients: ingredients });

export interface FetchIngredientsFailedAction extends BurgerBuilderAction {}
export const isFetchIngredientsFailedAction = (action: Action): action is FetchIngredientsFailedAction => action.type === ActionnTypes.FetchIngredientsRequestFail;
export const createFetchIngredientsFailedAction = (): FetchIngredientsAction => ({ type: ActionnTypes.FetchIngredientsRequestFail });