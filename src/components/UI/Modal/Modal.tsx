import * as React from 'react';
import * as cssClasses from './Modal.css';

interface Props {
  show: boolean;
}

const modal: React.SFC<Props> = props => (
  <div
    className={cssClasses.Modal}
    style={{ transform: props.show ? 'translateY(0)' : 'translateY(-100vh)', opacity: props.show ? 1 : 0 }}
  >
    {props.children}
  </div>
);

export default modal;