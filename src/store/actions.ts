import { Action } from 'redux';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

interface AddIngredientAction extends Action {
  ingredientName: string;
}
export const isAddIngredientAction = (action: Action): action is AddIngredientAction => action.type === ADD_INGREDIENT;

interface RemoveIngredientAction extends Action {
  ingredientName: string;
}
export const isRemoveIngredientAction = (action: Action): action is RemoveIngredientAction => action.type === REMOVE_INGREDIENT;