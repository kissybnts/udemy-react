import * as React from 'react';
import * as cssClasses from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

interface Props {
  show: boolean;
  modalClosed: () => void;
}

class Modal extends React.Component<Props, {}> {
  shouldComponentUpdate(nextProps: Props): boolean {
    return nextProps.show !== this.props.show;
  }

  render() {
    return (
      <React.Fragment>
        <Backdrop
          show={this.props.show}
          clicked={this.props.modalClosed}
        />
        <div
          className={cssClasses.Modal}
          style={{transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)', opacity: this.props.show ? 1 : 0}}
        >
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default Modal;