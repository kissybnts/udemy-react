import * as React from 'react';
import * as cssClasses from './Burger.css';
import BurgerIngredient, { BurgerIngredientTypes } from './BurgerIngredient/BurgerIngredient';
import { Ingredients } from '../../containers/BurgerBuilder/BurgerBuilder';

interface Props {
  ingredients: Ingredients;
}

const burger: React.SFC<Props> = props => {
  let ingredients = Object.keys(props.ingredients).map((value, index) => {
    return Array.from(Array(props.ingredients[value]))
      .map((_, subIndex) => (<BurgerIngredient key={value + '_' + index + '_' + subIndex} type={BurgerIngredientTypes[value]}/>));
  }).reduce((arr, elem) => arr.concat(elem), []);

  if (ingredients.length === 0) {
    ingredients.push(<p key={'empty_ingredients'}>Please start adding ingredients!</p>);
  }

  return (
    <div className={cssClasses.Burger}>
      <BurgerIngredient type={BurgerIngredientTypes.BreadTop}/>
      {ingredients}
      <BurgerIngredient type={BurgerIngredientTypes.BreadBottom}/>
    </div>
  );
};

export default burger;