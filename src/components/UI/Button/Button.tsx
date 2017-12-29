import * as React from 'react';
import * as cssClasses from './Button.css';

interface Props {
  clicked?: (event?: any) => void;
  type: ButtonType;
  disabled?: boolean;
}

type ButtonType = 'Success' | 'Danger';

const button: React.SFC<Props> = props => (
  <button
    className={[cssClasses.Button, cssClasses[props.type]].join(' ')}
    onClick={props.clicked}
    disabled={props.disabled}
  >
    {props.children}
  </button>);

export default button;