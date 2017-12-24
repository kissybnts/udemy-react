import * as React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Ingredients } from '../BurgerBuilder/BurgerBuilder';

interface State {
  ingredients: Ingredients;
}

class Checkout extends React.Component<{}, State> {
  state = {
    ingredients: {
      Salad: 1,
      Meat: 1,
      Bacon: 1,
      Cheese: 1
    }
  };

  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients}/>
      </div>
    );
  }
}

export default Checkout;