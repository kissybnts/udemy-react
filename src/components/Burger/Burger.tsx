import * as React from 'react';
import * as styles from './Burger.css';
import BurgerIngredient, { BurgerIngredientType } from './BurgerIngredient/BurgerIngredient';

interface Props {

}

const burger: React.SFC<Props> = props => {
  return (
    <div className={styles.Burger}>
      <BurgerIngredient type={BurgerIngredientType.BreadTop}/>
      <BurgerIngredient type={BurgerIngredientType.Meat}/>
      <BurgerIngredient type={BurgerIngredientType.Cheese}/>
      <BurgerIngredient type={BurgerIngredientType.Salad}/>
      <BurgerIngredient type={BurgerIngredientType.BreadBottom}/>
    </div>
  )
};

export default burger;