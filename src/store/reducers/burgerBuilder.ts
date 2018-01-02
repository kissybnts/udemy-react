import { Ingredients } from '../../containers/BurgerBuilder/BurgerBuilder';
import { isAddIngredientAction, isRemoveIngredientAction } from '../actions/index';
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

const INGREDIENT_PRICE = {
  Salad: 0.5,
  Meat: 0.4,
  Bacon: 0.7,
  Cheese: 1.3
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
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
      };
    }
  } else if (isRemoveIngredientAction(action)) {
    const ingredients = state.ingredients;
    if (ingredients !== undefined) {
      const oldAmount = ingredients[action.ingredientName];
      if (oldAmount === undefined || oldAmount <= 0) {
        return state;
      }
      return {
        ...state,
        ingredients: {
          ...ingredients,
          [action.ingredientName]: ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
      };
    }
  }
  return state;
};

export default reducer;