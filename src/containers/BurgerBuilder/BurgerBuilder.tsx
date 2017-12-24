import * as React from 'react';
import Burger from '../../components/Burger/Burger';
import { BurgerIngredientType } from '../../components/Burger/BurgerIngredient/BurgerIngredient';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { RouteComponentProps } from 'react-router';

interface State {
  ingredients?: Ingredients;
  totalPrice: number;
  purchasable: boolean;
  purchasing: boolean;
  loading: boolean;
  error: boolean;
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

class BurgerBuilder extends React.Component<RouteComponentProps<{}>, State> {
  state = {
    ingredients: undefined,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios.get('/ingredients.json')
      .then(req => {
        this.setState({ ingredients: { ...req.data }});
      }).catch(error => {
        this.setState({ error: true })
      });
  }

  addIngredientHandler = (type: BurgerIngredientType) => {
    const ingredients = this.state.ingredients;

    if (ingredients !== undefined) {
      const oldAmount = ingredients[type];
      const updatedAmount = oldAmount + 1;
      const updatedIngredients = Object.assign(ingredients);
      updatedIngredients[type] = updatedAmount;
      const priceAddition = INGREDIENT_PRICE[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice + priceAddition;
      this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
      this.updatePurchasable(updatedIngredients);
    }
  };

  removeIngredientHandler = (type: BurgerIngredientType) => {
    const ingredients = this.state.ingredients;

    if (ingredients !== undefined) {
      const oldAmount = ingredients[type];
      if (oldAmount <= 0) {
        return;
      }
      const updatedAmount = oldAmount - 1;
      const updatedIngredients = Object.assign(ingredients);
      updatedIngredients[type] = updatedAmount;
      const priceDeduction = INGREDIENT_PRICE[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceDeduction;
      this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
      this.updatePurchasable(updatedIngredients);
    }
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const ingredients = this.state.ingredients;

    let burger = this.state.error ? <p>Ingredients can't load!</p> : <Spinner/>;
    let orderSummary = null;

    if (ingredients !== undefined) {
      let disabledInfo: { [key: string]: boolean } = {};
      Object.keys(ingredients).forEach((key) => {
        const ing = ingredients;
        if (ing !== undefined) {
          disabledInfo[key] = ing[key] <= 0;
        }
      });

      burger = (
        <React.Fragment>
          <Burger ingredients={ingredients}/>
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

      orderSummary = <OrderSummary
        ingredients={ingredients}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice}
      />;
    }

    if (this.state.loading) {
      orderSummary = <Spinner/>
    }

    return (
      <React.Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }

  private updatePurchasable(ingredients: Ingredients) {
    const sum = Object.keys(ingredients)
      .map(key => ingredients[key])
      .reduce((total, elem) => total + elem, 0);
    this.setState({ purchasable: sum > 0 });
  }
}

export default withErrorHandler(BurgerBuilder, axios);