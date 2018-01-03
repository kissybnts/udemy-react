import { Ingredients } from '../../containers/BurgerBuilder/BurgerBuilder';
import { isAddIngredientAction, isFetchIngredientsFailedAction, isFetchIngredientsSuccessAction, isRemoveIngredientAction } from '../actions/index';
import { Action } from 'redux';

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
  } else if (isFetchIngredientsSuccessAction(action)) {
    const price: number = Object.keys(action.ingredients).map(key => action.ingredients[key] * INGREDIENT_PRICE[key]).reduce((prev, curr) => prev + curr);
    const totalPrice = price + 4;
    return {
      ...state,
      ingredients: {
        Salad: action.ingredients.Salad,
        Bacon: action.ingredients.Bacon,
        Cheese: action.ingredients.Cheese,
        Meat: action.ingredients.Meat
      },
      totalPrice: totalPrice,
      error: false
    }
  } else if (isFetchIngredientsFailedAction(action)) {
    return {
      ...state,
      error: true
    }
  }
  return state;
};

export default reducer;