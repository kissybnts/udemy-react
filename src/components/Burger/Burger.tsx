import * as React from 'react';
import * as styles from './Burger.css';
import BurgerIngredient, { BurgerIngredientType } from './BurgerIngredient/BurgerIngredient';
// import { ReactElement } from 'react';

interface Props {
  ingredients: Ingredient[];
}

export interface Ingredient {
  type: BurgerIngredientType;
  amount: number;
}

const burger: React.SFC<Props> = props => {
  const ingredients = props.ingredients.map((elem, index) => {
    return Array.from(Array(elem.amount).keys()).map((_, subIndex) => {
      return <BurgerIngredient type={elem.type} key={elem.type + index + subIndex} />;
    });
  });

  return (
    <div className={styles.Burger}>
      <BurgerIngredient type={BurgerIngredientType.BreadTop} />
      {ingredients}
      <BurgerIngredient type={BurgerIngredientType.BreadBottom} />
    </div>
  );
};

export default burger;