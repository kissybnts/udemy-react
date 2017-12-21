import * as React from 'react';
import { Ingredients } from '../../../containers/BurgerBuilder/BurgerBuilder';

interface Props {
  ingredients: Ingredients;
}

const orderSummary: React.SFC<Props> = props => {
  const summary = Object.keys(props.ingredients).map(key => (
    <li key={key}>{key}: {props.ingredients[key]}</li>
  ));

  return (<React.Fragment>
    <h3>Order Summary</h3>
    <p>Delicious burger will be served with following ingredients</p>
    <ul>
      {summary}
    </ul>
    <p>Continue to Checkout?</p>
  </React.Fragment>)
};

export default orderSummary;