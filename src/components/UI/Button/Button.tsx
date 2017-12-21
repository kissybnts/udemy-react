import * as React from 'react';
import * as cssClasses from './Button.css';

interface Props {
  clicked: () => void;
  type: ButtonType;
}

type ButtonType = 'Success' | 'Danger';

const button: React.SFC<Props> = props => (
  <button
    className={[cssClasses.Button, cssClasses[props.type]].join(' ')}
    onClick={props.clicked}
  >
    {props.children}
    </button>);

export default button;