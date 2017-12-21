import * as React from 'react';
import * as cssClasses from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

interface Props {
  show: boolean;
  modalClosed: () => void;
}

const modal: React.SFC<Props> = props => (
  <React.Fragment>
    <Backdrop
      show={props.show}
      clicked={props.modalClosed}
    />
    <div
      className={cssClasses.Modal}
      style={{ transform: props.show ? 'translateY(0)' : 'translateY(-100vh)', opacity: props.show ? 1 : 0 }}
    >
      {props.children}
    </div>
  </React.Fragment>
);

export default modal;