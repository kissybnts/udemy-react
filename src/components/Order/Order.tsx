import * as React from 'react';
import * as cssClasses from './Order.css';
import { Ingredients } from '../../containers/BurgerBuilder/BurgerBuilder';

interface Props {
  ingredients: Ingredients;
  price: number;
}

const order: React.SFC<Props> = props => {
  const ingredients = Object.keys(props.ingredients).map(ingKey => (
    <span key={ingKey} style={{display: 'inline-block', margin: '0 5px'}}>{ingKey} ({props.ingredients[ingKey]})</span>
  ));

  return (
    <div className={cssClasses.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
    </div>
  );
};

export default order;