import * as React from 'react';
import * as cssClasses from './Modal.css';

const modal: React.SFC = props => (<div className={cssClasses.Modal}>{props.children}</div>);

export default modal;