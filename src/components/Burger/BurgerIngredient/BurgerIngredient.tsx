import * as React from 'react';
import * as styles from './BurgerIngredient.css';
import { ReactElement } from 'react';

interface Props {
  type: BurgerIngredientType
}

export enum BurgerIngredientType {
  BreadTop, BreadBottom, Meat, Cheese, Bacon, Salad
}

const burgerIngredient: React.SFC<Props> = (props: Props) => {
  let ingredient: ReactElement<any> | null = null;

  switch (props.type) {
    case (BurgerIngredientType.BreadTop):
      ingredient = (
        <div className={styles.BreadTop}>
          <div className={styles.Seeds1}/>
          <div className={styles.Seeds2}/>
        </div>
      );
      break;
    case (BurgerIngredientType.BreadBottom):
      ingredient = <div className={styles.BreadBottom} />;
      break;
    case (BurgerIngredientType.Meat):
      ingredient = <div className={styles.Meat} />;
      break;
    case (BurgerIngredientType.Cheese):
      ingredient = <div className={styles.Cheese} />;
      break;
    case (BurgerIngredientType.Bacon):
      ingredient = <div className={styles.Bacon} />;
      break;
    case (BurgerIngredientType.Salad):
      ingredient = <div className={styles.Salad} />;
      break;
    default:
      break;
  }

  return ingredient;
};

export default burgerIngredient;