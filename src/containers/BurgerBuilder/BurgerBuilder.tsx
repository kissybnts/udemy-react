import * as React from 'react';
import Burger from '../../components/Burger/Burger';
import { BurgerIngredientType } from '../../components/Burger/BurgerIngredient/BurgerIngredient';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

interface State {
  ingredients: Ingredients;
  totalPrice: number;
  purchasable: boolean;
  purchasing: boolean;
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
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  };

  private updatePurchasable(ingredients: Ingredients) {
    const sum = Object.keys(ingredients)
      .map(key => ingredients[key])
      .reduce((sum, elem) => sum + elem, 0);
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = (type: BurgerIngredientType) => {
    const oldAmount = this.state.ingredients[type];
    const updatedAmount = oldAmount + 1;
    const updatedIngredients = Object.assign(this.state.ingredients);
    updatedIngredients[type] = updatedAmount;
    const priceAddition = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchasable(updatedIngredients);
  };

  removeIngredientHandler = (type: BurgerIngredientType) => {
    const oldAmount = this.state.ingredients[type];
    if (oldAmount <= 0) { return }
    const updatedAmount = oldAmount - 1;
    const updatedIngredients = Object.assign(this.state.ingredients);
    updatedIngredients[type] = updatedAmount;
    const priceDeduction = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchasable(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert('You continue!');
  };

  render() {
    let disabledInfo: { [key: string] : boolean } = {};
    Object.keys(this.state.ingredients).forEach((key) => {
      disabledInfo[key] = this.state.ingredients[key] <= 0;
    });

    return (
      <React.Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabledInfo={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;