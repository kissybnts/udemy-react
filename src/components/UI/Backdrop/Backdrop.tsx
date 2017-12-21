import * as React from 'react';
import * as cssClasses from './Backdrop.css';

interface Props {
  show: boolean;
  clicked: () => void;
}

const backdrop: React.SFC<Props> = props => props.show ?
  (<div className={cssClasses.Backdrop} onClick={props.clicked} />) : null;

export default backdrop;