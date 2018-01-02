import { Ingredients } from '../containers/BurgerBuilder/BurgerBuilder';
import { isAddIngredientAction, isRemoveIngredientAction } from './actions';
import { Action } from 'redux';

export interface BurgerBuilderState {
  ingredients?: Ingredients;
  totalPrice: number;
}

const initialState: BurgerBuilderState = {
  ingredients: {
    Bacon: 0,
    Cheese: 0,
    Meat: 0,
    Salad: 0
  },
  totalPrice: 4
};

const reducer = (state: BurgerBuilderState = initialState, action: Action) => {
  if (isAddIngredientAction(action)) {
    const ingredients = state.ingredients;
    if (ingredients !== undefined) {
      const oldAmount = ingredients[action.ingredientName];
      if (oldAmount === undefined || oldAmount < 0) {
        return state;
      }

      return {
        ...state,
        ingredients: {
          ...ingredients,
          [action.ingredientName]: ingredients[action.ingredientName] + 1
        }
      };
    }
  } else if (isRemoveIngredientAction(action)) {
    const ingredients = state.ingredients;
    if (ingredients !== undefined) {
      return {
        ...state,
        ingredients: {
          ...ingredients,
          [action.ingredientName]: ingredients[action.ingredientName] - 1
        }
      };
    }
  }
  return state;
};

export default reducer;