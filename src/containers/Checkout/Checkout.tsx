import * as React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Ingredients } from '../BurgerBuilder/BurgerBuilder';
import { Route, RouteComponentProps } from 'react-router';
import ContactData from './ContactData/ContactData';

interface State {
  ingredients: Ingredients;
  price: number;
}

class Checkout extends React.Component<RouteComponentProps<{}>, State> {
  state = {
    ingredients: {
      Bacon: 1,
      Cheese: 1,
      Meat: 1,
      Salad: 1
    },
    price: 4
  };

  componentWillMount() {
    const query = this.parseUrlParams(this.props.location.search.toString());
    const ingredients = Object.assign(this.state.ingredients);
    query.forEach((value, key) => {
      if (ingredients[key] !== undefined) {
        ingredients[key] = +value;
      }
    });

    const price = query.get('price');

    this.setState({ ingredients: ingredients, price: price ? +price : 4 });
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
        <Route path={this.props.match.url + '/contact-data'} render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props} />) }  />
      </div>
    );
  }

  private parseUrlParams(query: string): Map<string, string> {
    if (query) {
      const params = query.split('?')[1];
      return params.split('&').reduce((previousValue, currentValue) => {
        let components = currentValue.split('=');
        previousValue.set(components[0], components[1]);
        return previousValue;
      }, new Map<string, string>());
    } else {
      return new Map<string, string>()
    }
  }
}

export default Checkout;