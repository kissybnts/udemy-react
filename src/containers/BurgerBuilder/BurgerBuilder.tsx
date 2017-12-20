import * as React from 'react';
import Burger from '../../components/Burger/Burger';
import { BurgerIngredientType } from '../../components/Burger/BurgerIngredient/BurgerIngredient';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

interface State {
  ingredients: Ingredients;
  totalPrice: number;
}

const INGREDIENT_PRICE = {
  Salad: 0.5,
  Meat: 0.4,
  Bacon: 0.7,
  Cheese: 1.3
};

export interface Ingredients {
  Meat: number;
  Cheese: number;
  Bacon: number;
  Salad: number;
}

class BurgerBuilder extends React.Component<{}, State> {
  state = {
    ingredients: {
      Meat: 0,
      Cheese: 0,
      Bacon: 0,
      Salad: 0
    },
    totalPrice: 4
  };

  addIngredientHandler = (type: BurgerIngredientType) => {
    const oldAmount = this.state.ingredients[type];
    const updatedAmount = oldAmount + 1;
    const updatedIngredients = Object.assign(this.state.ingredients);
    updatedIngredients[type] = updatedAmount;
    const priceAddition = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  };

  render() {
    return (
      <React.Fragment>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls ingredientAdded={this.addIngredientHandler}/>
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;