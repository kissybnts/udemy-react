import * as React from 'react';
import Burger, { Ingredient } from '../../components/Burger/Burger';
import { BurgerIngredientType } from '../../components/Burger/BurgerIngredient/BurgerIngredient';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

interface State {
  ingredients: Ingredient[];
}

class BurgerBuilder extends React.Component<{}, State> {
  state = {
    ingredients: [
      {type: BurgerIngredientType.Meat, amount: 0},
      {type: BurgerIngredientType.Cheese, amount: 0},
      {type: BurgerIngredientType.Bacon, amount: 0},
      {type: BurgerIngredientType.Salad, amount: 0},
    ]
  };

  render() {
    return (
      <React.Fragment>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;