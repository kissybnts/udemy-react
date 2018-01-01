import { Ingredients } from '../containers/BurgerBuilder/BurgerBuilder';
import { isAddIngredientAction, isRemoveIngredientAction } from './actions';
import { Action } from 'redux';

interface State {
  ingredients?: Ingredients;
  totalPrice: number;
}

const initialState = {
  ingredients: undefined,
  totalPrice: 4
};

const reducer = (state: State = initialState, action: Action) => {
  if (isAddIngredientAction(action)) {
    const ingredients = state.ingredients;
    if (ingredients !== undefined) {
      const oldAmount = ingredients[action.ingredientName];
      if (!oldAmount || oldAmount <= 0) {
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