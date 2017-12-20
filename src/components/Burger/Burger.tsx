import * as React from 'react';
import * as styles from './Burger.css';
import BurgerIngredient, { BurgerIngredientType } from './BurgerIngredient/BurgerIngredient';

interface Props {
  ingredients: Ingredient[];
}

export interface Ingredient {
  type: BurgerIngredientType;
  amount: number;
}

const burger: React.SFC<Props> = props => {
  let ingredients = props.ingredients.map((elem, index) => {
    return Array.from(Array(elem.amount).keys()).map((_, subIndex) => {
      return <BurgerIngredient type={elem.type} key={elem.type + index + subIndex} />;
    });
  }).reduce((arr, el) => {
    return arr.concat(el);
  }, []);

  if (ingredients.length == 0) {
    ingredients.push(<p key={'empty_ingredients'}>Please start adding ingredients!</p>);
  }

  return (
    <div className={styles.Burger}>
      <BurgerIngredient type={BurgerIngredientType.BreadTop} />
      {ingredients}
      <BurgerIngredient type={BurgerIngredientType.BreadBottom} />
    </div>
  );
};

export default burger;