import * as React from 'react';
import { Ingredients } from '../../../containers/BurgerBuilder/BurgerBuilder';
import Button from '../../UI/Button/Button';

interface Props {
  ingredients: Ingredients;
  purchaseCanceled: () => void;
  purchaseContinued: () => void;
}

const orderSummary: React.SFC<Props> = props => {
  const summary = Object.keys(props.ingredients).map(key => (
    <li key={key}>{key}: {props.ingredients[key]}</li>
  ));

  return (<React.Fragment>
    <h3>Your Order</h3>
    <p>A Delicious burger will be served with the following ingredients:</p>
    <ul>
      {summary}
    </ul>
    <p>Continue to Checkout?</p>
    <Button type={'Danger'} clicked={props.purchaseCanceled}>CANCEL</Button>
    <Button type={'Success'} clicked={props.purchaseContinued}>CANCEL</Button>
  </React.Fragment>)
};

export default orderSummary;