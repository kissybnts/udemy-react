import * as React from 'react';
import {ReactElement} from 'react';
import * as styles from './BurgerIngredient.css';

interface Props {
  type: BurgerIngredientType
}

export type BurgerIngredientType = 'BreadTop' | 'BreadBottom' | 'Meat' | 'Cheese' | 'Bacon' | 'Salad';

export namespace BurgerIngredientTypes {
  export const BreadTop: BurgerIngredientType = 'BreadTop';
  export const BreadBottom: BurgerIngredientType = 'BreadBottom';
  export const Meat: BurgerIngredientType = 'Meat';
  export const Cheese: BurgerIngredientType = 'Cheese';
  export const Bacon: BurgerIngredientType = 'Bacon';
  export const Salad: BurgerIngredientType = 'Salad';
}

// export interface P {
//   type: BurgerIngredientType;
//   amount: number;
//   unitPrice: number;
//   label: string;
// }

const burgerIngredient: React.SFC<Props> = (props: Props) => {
  let ingredient: ReactElement<any> | null = null;

  switch (props.type) {
    case (BurgerIngredientTypes.BreadTop):
      ingredient = (
        <div className={styles.BreadTop}>
          <div className={styles.Seeds1}/>
          <div className={styles.Seeds2}/>
        </div>
      );
      break;
    case (BurgerIngredientTypes.BreadBottom):
      ingredient = <div className={styles.BreadBottom}/>;
      break;
    case (BurgerIngredientTypes.Meat):
      ingredient = <div className={styles.Meat}/>;
      break;
    case (BurgerIngredientTypes.Cheese):
      ingredient = <div className={styles.Cheese}/>;
      break;
    case (BurgerIngredientTypes.Bacon):
      ingredient = <div className={styles.Bacon}/>;
      break;
    case (BurgerIngredientTypes.Salad):
      ingredient = <div className={styles.Salad}/>;
      break;
    default:
      break;
  }

  return ingredient;
};

export default burgerIngredient;