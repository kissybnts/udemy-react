import * as React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Ingredients } from '../BurgerBuilder/BurgerBuilder';
import { RouteComponentProps } from 'react-router';

interface State {
  ingredients: Ingredients;
}

class Checkout extends React.Component<RouteComponentProps<{}>, State> {
  state = {
    ingredients: {
      Bacon: 1,
      Cheese: 1,
      Meat: 1,
      Salad: 1
    }
  };

  componentDidMount() {
    const query = this.parseUrlParams(this.props.location.search.toString());
    const ingredients = Object.assign(this.state.ingredients);
    query.forEach((value, key) => {
      if (ingredients[key] !== undefined) {
        ingredients[key] = +value;
      }
    });
    this.setState({ ingredients: ingredients });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
      </div>
    );
  }

  private parseUrlParams(query: string): Map<string, string> {
    const params = query.split('?')[1];
    return params.split('&').reduce((previousValue, currentValue) => {
      let components = currentValue.split('=');
      previousValue.set(components[0], components[1]);
      return previousValue;
    }, new Map<string, string>());
  }
}

export default Checkout;