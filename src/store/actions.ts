import { Action } from 'redux';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

interface AddIngredientAction extends Action {
  ingredientName: string;
}
export const isAddIngredientAction = (action: Action): action is AddIngredientAction => action.type === ADD_INGREDIENT;
export const createAddIngredientAction = (ingName: string): AddIngredientAction => ({ type: ADD_INGREDIENT, ingredientName: ingName });

interface RemoveIngredientAction extends Action {
  ingredientName: string;
}
export const isRemoveIngredientAction = (action: Action): action is RemoveIngredientAction => action.type === REMOVE_INGREDIENT;
export const createRemoveIngredientAction = (ingName: string): RemoveIngredientAction => ({ type: REMOVE_INGREDIENT, ingredientName: ingName });