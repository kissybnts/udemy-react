import * as React from 'react';
import * as styles from './BuildControls.css';
import { BurgerIngredientType } from '../BurgerIngredient/BurgerIngredient';
import BuildControl from './BuildControl/BuildControl';

interface Props {

}

interface Control {
  label:string;
  type: BurgerIngredientType;
}

const controls: Control[] = [
  { label: 'Salad', type: BurgerIngredientType.Salad },
  { label: 'Bacon', type: BurgerIngredientType.Bacon },
  { label: 'Cheese', type: BurgerIngredientType.Cheese },
  { label: 'Meat', type: BurgerIngredientType.Meat }
];

const buildControls:React.SFC<Props> = props => (
  <div className={styles.BuildControls}>
    {controls.map(ctrl => (<BuildControl key={ctrl.label + ctrl.type} label={ctrl.label} />))}
  </div>
);

export default buildControls;