import * as actionTypes from './actions';
import { Ingredients } from '../containers/BurgerBuilder/BurgerBuilder';
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
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return;
    case actionTypes.REMOVE_INGREDIENT:
      return;
  }
};

export default reducer;