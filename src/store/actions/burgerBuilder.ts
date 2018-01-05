import { Action } from 'redux';
import { Ingredients } from '../../containers/BurgerBuilder/BurgerBuilder';

const ADD_INGREDIENT = 'ADD_INGREDIENT';
const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
const FETCH_INGREDIENTS_REQUEST = 'FETCH_INGREDIENTS';
const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';
const FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED';

export interface AddIngredientAction extends Action {
  ingredientName: string;
}
export const isAddIngredientAction = (action: Action): action is AddIngredientAction => action.type === ADD_INGREDIENT;
export const createAddIngredientAction = (ingName: string): AddIngredientAction => ({ type: ADD_INGREDIENT, ingredientName: ingName });

export interface RemoveIngredientAction extends Action {
  ingredientName: string;
}
export const isRemoveIngredientAction = (action: Action): action is RemoveIngredientAction => action.type === REMOVE_INGREDIENT;
export const createRemoveIngredientAction = (ingName: string): RemoveIngredientAction => ({ type: REMOVE_INGREDIENT, ingredientName: ingName });

interface FetchIngredientsAction extends Action {}
export const isFetchIngredientsAction = (action: Action): action is FetchIngredientsAction => action.type === FETCH_INGREDIENTS_REQUEST;
export const createFetchIngredientsAction = (): FetchIngredientsAction => ({ type: FETCH_INGREDIENTS_REQUEST });

export interface FetchIngredientsSuccessAction extends Action {
  ingredients: Ingredients;
}
export const isFetchIngredientsSuccessAction = (action: Action): action is FetchIngredientsSuccessAction => action.type === FETCH_INGREDIENTS_SUCCESS;
export const createFetchIngredientsSuccessAction = (ingredients: Ingredients): FetchIngredientsSuccessAction => ({ type: FETCH_INGREDIENTS_SUCCESS, ingredients: ingredients });

export interface FetchIngredientsFailedAction extends Action {}
export const isFetchIngredientsFailedAction = (action: Action): action is FetchIngredientsFailedAction => action.type === FETCH_INGREDIENTS_FAILED;
export const createFetchIngredientsFailedAction = (): FetchIngredientsAction => ({ type: FETCH_INGREDIENTS_FAILED });