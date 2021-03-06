import * as React from 'react';
import * as cssClasses from './CheckoutSummary.css';
import Burger from '../../Burger/Burger';
import { Ingredients } from '../../../containers/BurgerBuilder/BurgerBuilder';
import Button from '../../UI/Button/Button';

interface Props {
  ingredients: Ingredients;
  checkoutCancelled: () => void;
  checkoutContinued: () => void;
}

const checkoutSummary: React.SFC<Props> = props => (
  <div className={cssClasses.CheckoutSummary}>
    <h1>We hope it tastes well!</h1>
    <div style={{ width: '100%', margin: 'auto' }}>
      <Burger ingredients={props.ingredients}/>
    </div>
    <Button type={'Danger'} clicked={props.checkoutCancelled}>CANCEL</Button>
    <Button type={'Success'} clicked={props.checkoutContinued}>CONTINUE</Button>
  </div>
);

export default checkoutSummary;