import * as React from 'react';
import { ReactElement } from 'react';
import * as cssClasses from './BurgerIngredient.css';

interface Props {
  type: BurgerIngredientType;
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

const burgerIngredient: React.SFC<Props> = (props: Props) => {
  let ingredient: ReactElement<HTMLDivElement> | null = null;

  switch (props.type) {
    case (BurgerIngredientTypes.BreadTop):
      ingredient = (
        <div className={cssClasses.BreadTop}>
          <div className={cssClasses.Seeds1}/>
          <div className={cssClasses.Seeds2}/>
        </div>
      );
      break;
    case (BurgerIngredientTypes.BreadBottom):
      ingredient = <div className={cssClasses.BreadBottom}/>;
      break;
    case (BurgerIngredientTypes.Meat):
      ingredient = <div className={cssClasses.Meat}/>;
      break;
    case (BurgerIngredientTypes.Cheese):
      ingredient = <div className={cssClasses.Cheese}/>;
      break;
    case (BurgerIngredientTypes.Bacon):
      ingredient = <div className={cssClasses.Bacon}/>;
      break;
    case (BurgerIngredientTypes.Salad):
      ingredient = <div className={cssClasses.Salad}/>;
      break;
    default:
      break;
  }

  return ingredient;
};

export default burgerIngredient;