import * as React from 'react';
import * as styles from './BuildControls.css';
import { BurgerIngredientType, BurgerIngredientTypes } from '../BurgerIngredient/BurgerIngredient';
import BuildControl from './BuildControl/BuildControl';

interface Props {
  ingredientAdded: (type: BurgerIngredientType) => void;
  ingredientRemoved: (type: BurgerIngredientType) => void;
  disabledInfo: { [key: string] : boolean };
  price: number;
}

interface Control {
  label: string;
  type: BurgerIngredientType;
}

const controls: Control[] = [
  { label: 'Salad', type: BurgerIngredientTypes.Salad },
  { label: 'Bacon', type: BurgerIngredientTypes.Bacon },
  { label: 'Cheese', type: BurgerIngredientTypes.Cheese },
  { label: 'Meat', type: BurgerIngredientTypes.Meat }
];

const buildControls: React.SFC<Props> = props => (
  <div className={styles.BuildControls}>
    <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map(ctrl => (<BuildControl
      key={ctrl.label + ctrl.type}
      label={ctrl.label}
      added={() => props.ingredientAdded(ctrl.type)}
      removed={() => props.ingredientRemoved(ctrl.type)}
      disabled={props.disabledInfo[ctrl.type]}
    />))}
  </div>
);

export default buildControls;