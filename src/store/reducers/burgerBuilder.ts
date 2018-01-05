import { Ingredients } from '../../containers/BurgerBuilder/BurgerBuilder';
import { isAddIngredientAction, isFetchIngredientsFailedAction, isFetchIngredientsSuccessAction, isRemoveIngredientAction } from '../actions/index';
import { Action } from 'redux';
import { updateObject } from '../utility';

export interface BurgerBuilderState {
  ingredients?: Ingredients;
  totalPrice: number;
  error: boolean;
}

const initialState: BurgerBuilderState = {
  ingredients: undefined,
  totalPrice: 4,
  error: false
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

      const updatedIngredients: Ingredients = updateObject(state.ingredients, {
        [action.ingredientName]: ingredients[action.ingredientName] + 1
      });

      return updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
      });
    }
  } else if (isRemoveIngredientAction(action)) {
    const ingredients = state.ingredients;
    if (ingredients !== undefined) {
      const oldAmount = ingredients[action.ingredientName];
      if (oldAmount === undefined || oldAmount <= 0) {
        return state;
      }

      const updatedIngredients: Ingredients = updateObject(state.ingredients, {
        [action.ingredientName]: ingredients[action.ingredientName] - 1
      });

      return updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
      });
    }
  } else if (isFetchIngredientsSuccessAction(action)) {
    const price: number = Object.keys(action.ingredients).map(key => action.ingredients[key] * INGREDIENT_PRICE[key]).reduce((prev, curr) => prev + curr);
    const totalPrice = price + 4;

    const updatedIngredients: Ingredients = updateObject(state.ingredients, {
      Salad: action.ingredients.Salad,
      Bacon: action.ingredients.Bacon,
      Cheese: action.ingredients.Cheese,
      Meat: action.ingredients.Meat,
    });

    return updateObject(state, {
      ingredients: updatedIngredients,
      totalPrice: totalPrice,
      error: false
    });
  } else if (isFetchIngredientsFailedAction(action)) {
    return updateObject(state, {
      error: true
    });
  }
  return state;
};

export default reducer;